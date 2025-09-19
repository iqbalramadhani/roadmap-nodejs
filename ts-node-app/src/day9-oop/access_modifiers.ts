import { log } from "node:console";

class Account {
    public username: string;
    private password: string;
    protected balance: number;

    constructor(username: string, password: string, balance: number) {
        this.username = username;
        this.password = password;
        this.balance = balance;
    }

    public checkBalance(): number {
        return this.balance;
    }

    private getPassword(): string {
        return this.password;
    }
}

const acc = new Account("Iqbal", "123456", 1000);
console.log(acc.username);
console.log(acc.checkBalance());


