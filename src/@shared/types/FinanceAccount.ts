export interface FinanceAccount {
    id: number;
    title: string;
    transactions: {
        title: string,
        amount: number,
        date: string,
    }[];
    bank: {
        code: string,
        name: string,
    };
    number: string,
    balance: number,
}