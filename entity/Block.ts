import {Transaction} from "./index";
import * as crypto from 'crypto';

export class Block {
    nonce: number;
    transaction: Transaction;
    prevHash: string;
    hash: any;

    constructor() {
        this.nonce = Math.round(Math.random() * 999999999)
        //this.hash = crypto.createHash('SHA256');
        this.hash = crypto.createHash('SHA256').update(this.nonce.toString()).digest('hex');
    }
}
