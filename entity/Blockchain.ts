import {Block, Transaction, Wallet} from "./index";
import * as fs from 'fs';
import * as path from 'path';

export class Blockchain {
    Blocks: Block[];

    constructor() {
        this.Blocks = [];
    }

    BLOCKCHAIN_FILE_PATH = path.join(__dirname, '../blockchain.json');
    saveBlockchain(blockchain: Blockchain) {
        try {
            const blockchainJson = JSON.stringify(blockchain, null, 2);

            fs.writeFileSync(this.BLOCKCHAIN_FILE_PATH, blockchainJson);

            console.log('Blockchain sauvegardée avec succès dans >', this.BLOCKCHAIN_FILE_PATH);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de la blockchain:', error);
        }
    }

    createGeneseBlock(amount: number, wallet: Wallet) {
        const transaction = new Transaction()
        transaction.amount = amount
        transaction.sender = "genese"
        transaction.recipient = wallet.getPublicKey()

        const block = new Block()
        block.transaction = transaction
        block.prevHash = "0"
        this.Blocks.push(block);
    }

    mine(transaction: Transaction) {
        const block = new Block();
        block.prevHash = this.Blocks[this.Blocks.length - 1].hash;
        block.transaction = transaction;
        this.Blocks.push(block);
    }
}
