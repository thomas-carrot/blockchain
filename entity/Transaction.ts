export class Transaction {
    sender: string;
    recipient: string;
    amount: number;

    signed?: boolean
    timestamp: number;

    constructor() {
        this.timestamp = Date.now();
        this.signed = true;
    }
}
