export interface FinanceAccount {
    id: string;
    isActive: boolean;
    title: string;
    transactions: {
        title: string,
        amount: number,
        date: string,
        destination?: string;
    }[];
    bank: {
        code: string,
        name: string,
    };
    number: string,
    balance: number,
}