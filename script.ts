import {Wallet, Blockchain} from "./entity";
import inquirer from "inquirer";

function main() {
    const blockchain = new Blockchain();
    const wallet = new Wallet();
    const wallet2 = new Wallet();
    blockchain.createGeneseBlock(100, wallet)

    console.log("-------------------- Création de 100 jetons --------------------")
    //console.log("Balance Wallet 1 : ", wallet.getBalance(blockchain), "jetons");
    console.log("----------------------------------------------------------------")

    console.log("")
    console.log("")

    console.log("------------- Payment entre wallet et wallet 2 -----------------")
    console.log("")

    blockchain.mine(wallet.sendMoney(blockchain, 34, wallet2.getPublicKey(), wallet.getPrivateKey()))

    console.log("")
    console.log("Wallet 1 donne 34 jetons to Wallet2")
    console.log("")
    //console.log("Solde Wallet 1 : ", wallet.getBalance(blockchain), "jetons");
    //console.log("Solde Wallet 2 : ", wallet2.getBalance(blockchain), "jetons");

    console.log("")

    console.log("---------------------- Test Private Key ------------------------")
    console.log(wallet.isValidPrivateKey())

    console.log("----------------------------------------------------------------")
    blockchain.saveBlockchain(blockchain)
    console.log("")
}

async function start() {
    const blockchain = new Blockchain();
    const wallet = new Wallet();
    const wallet2 = new Wallet();
    blockchain.createGeneseBlock(100, wallet);

    let continuer = true;

    while (continuer) {
        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "Que voulez-vous faire ?",
                choices: ["Voir mon compte", "Faire un paiement", "Sortir"],
            },
        ]);

        switch (answer.choice) {
            case "Voir mon compte":
                console.log("Affichage des informations du compte...");
                await viewAccount();
                break;
            case "Faire un paiement":
                await sendMoney();
                blockchain.saveBlockchain(blockchain)
                break;
            case "Sortir":
                console.log("Fermeture du programme.");
                continuer = false;
                break;
        }
    }

    async function viewAccount() {
        const { privateKey } = await inquirer.prompt([
            {
                type: "password",
                name: "privateKey",
                message: "Entrez votre clé privée :",
            },
        ]);
        console.log("Solde Wallet 1 :", wallet.getBalance(blockchain, privateKey), "jetons");
    }

    async function sendMoney() {
        const { recipientPublicKey } = await inquirer.prompt([
            {
                type: "input",
                name: "recipientPublicKey",
                message: "Entrez la clé publique du destinataire :",
                default: wallet2.getPublicKey()
            },
        ]);

        const { privateKey } = await inquirer.prompt([
            {
                type: "password",
                name: "privateKey",
                message: "Entrez votre clé privée :",
                default: wallet.getPrivateKey()
            },
        ]);

        const { amount } = await inquirer.prompt([
            {
                type: "number",
                name: "amount",
                message: "Entrez le montant à envoyer :",
                default: 0
            },
        ]);

        console.log("------------- Payment entre wallet et wallet 2 -----------------");
        blockchain.mine(wallet.sendMoney(blockchain, amount, recipientPublicKey, privateKey));
        console.log("Solde Wallet 1 :", wallet.getBalance(blockchain, wallet.getPrivateKey()), "jetons");
        console.log("Solde Wallet 2 :", wallet2.getBalance(blockchain, wallet2.getPrivateKey()), "jetons");
    }
}

//main()
start()
