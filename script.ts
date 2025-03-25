import {Wallet, Blockchain} from "./entity";
import * as readline from 'readline';

function main() {
    const blockchain = new Blockchain();
    const wallet = new Wallet();
    const wallet2 = new Wallet();
    blockchain.createGeneseBlock(100, wallet)

    console.log("-------------------- Création de 100 jetons --------------------")
    console.log("Balance Wallet 1 : ", wallet.getBalance(blockchain), "jetons");
    console.log("----------------------------------------------------------------")

    console.log("")
    console.log("")

    console.log("------------- Payment entre wallet et wallet 2 -----------------")
    console.log("")

    blockchain.mine(wallet.sendMoney(blockchain, 34, wallet2.getPublicKey()))

    console.log("")
    console.log("Wallet 1 donne 34 jetons to Wallet2")
    console.log("")
    console.log("Solde Wallet 1 : ", wallet.getBalance(blockchain), "jetons");
    console.log("Solde Wallet 2 : ", wallet2.getBalance(blockchain), "jetons");

    console.log("")

    console.log("---------------------- Test Private Key ------------------------")
    console.log(wallet.isValidPrivateKey())

    console.log("----------------------------------------------------------------")
    blockchain.saveBlockchain(blockchain)
    console.log("")
}



function start() {
    const blockchain = new Blockchain();
    const wallet = new Wallet();
    blockchain.createGeneseBlock(100, wallet)


    console.clear();
    console.log('=== Système de Blockchain ===');
    console.log('1. Créer un nouveau wallet');
    console.log('2. Voir mon compte');
    console.log('3. Faire un paiement');
    console.log('4. Quitter');

    this.rl.question('Choisissez une option (1-4): ', async (choice) => {
        switch(choice) {
            case '1':
                console.log("choice1")
                break;
            case '2':
                console.log("choice2")
                break;
            case '3':
                console.log("choice3")
                break;
            case '4':
                console.log('Au revoir!');
                return;
            default:
                console.log('Option invalide. Réessayez.');
                this.pressEnterToContinue();
        }
    });
}

//main()
start()
