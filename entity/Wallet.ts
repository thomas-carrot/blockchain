import * as crypto from 'crypto';
import {Blockchain} from "./Blockchain";
import {Transaction} from "./Transaction";

export class Wallet {
    private readonly privateKey: string;
    private readonly publicKey: string;

    constructor() {
        const { privateKey, publicKey } = this.generateKeyPair();
        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }

    getPublicKey(): string {
        return this.publicKey;
    }
    getPrivateKey(): string {
        return this.privateKey;
    }

    private generateKeyPair(): { privateKey: string, publicKey: string } {
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 570,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        });

        return {
            privateKey: privateKey,
            publicKey: publicKey
        };
    }


    isValidPrivateKey(): boolean {
        try {
            crypto.createPrivateKey({
                key: this.privateKey,
                format: 'pem',
                type: 'pkcs8'
            });
            return true;
        }
        catch (error) {
            return false;
        }
    }
    privateKeyToPublicKey(): string {
        try {
            const privateKey = crypto.createPrivateKey({
                key: this.privateKey,
                format: 'pem',
                type: 'pkcs8'
            });

            const publicKey = crypto.createPublicKey(privateKey);

            return publicKey.export({
                type: 'spki',
                format: 'pem'
            }).toString();

        }
        catch (error) {
            console.error('Erreur lors de la conversion de la clé privée en clé publique:', error);
            throw error;
        }
    }

    getBalance(blockchain: Blockchain, privateKey: string): number {
        let balance: number = 0;

        for (const block of blockchain.Blocks) {
            if (block.transaction.signed) {
                if (block.transaction.sender === this.privateKeyToPublicKey())
                    balance -= block.transaction.amount;

                if (block.transaction.recipient === this.privateKeyToPublicKey())
                    balance += block.transaction.amount;
            }
        }

        return balance;
    }
    sendMoney(blockchain: Blockchain, amount: number, publicKeyReceiver: string, privateKey: string) {

        const transaction = new Transaction()

        if (amount > this.getBalance(blockchain, "coucou")) {
            transaction.signed = false
        }

        transaction.amount = amount
        transaction.sender = this.privateKeyToPublicKey();
        transaction.recipient = publicKeyReceiver

        return transaction;
    }
}
