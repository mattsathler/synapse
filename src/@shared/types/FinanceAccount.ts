export interface FinanceAccount {
    id: string;
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