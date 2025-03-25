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

    blockchain.mine(wallet.sendMoney(blockchain, 34, wallet2.getPublicKey()))

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
    console.log("Private Key : ", wallet.getPrivateKey)
    blockchain.createGeneseBlock(100, wallet)

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
            console.log("Procédure de paiement en cours...");
            break;
        case "Sortir":
            console.log("Fermeture du programme.");
            return;
    }

    async function viewAccount() {
        const { privateKey } = await inquirer.prompt([
            {
                type: "password", // Masque la saisie de la clé privée
                name: "privateKey",
                message: "Entrez votre clé privée :",
            },
        ]);

        console.log("Solde Wallet 1 :", wallet.getBalance(blockchain, privateKey), "jetons");
    }
}

//main()
start()
