import { FinanceAccount } from "../types/FinanceAccount";

export function getMockedFinanceAccounts(): FinanceAccount[] {
    return [
        {
            id: '1',
            title: "Corrente - Principal",
            transactions: [
                { title: "Depósito inicial", amount: 2500.00, date: "2025-10-01" },
                { title: "Pagamento - Energia", amount: -320.45, date: "2025-10-05" },
                { title: "Transferência recebida", amount: 800.00, date: "2025-10-10" },
            ],
            bank: { code: "001", name: "Banco do Brasil" },
            number: "12345-6",
            balance: 2400,
        },
        {
            id: '2',
            title: "Poupança",
            transactions: [
                { title: "Depósito mensal", amount: 500.00, date: "2025-09-01" },
                { title: "Rendimento", amount: 3.25, date: "2025-10-01" },
            ],
            bank: { code: "104", name: "Caixa Econômica Federal" },
            number: "98765-4",
            balance: 0,
        },
        {
            id: '3',
            title: "Investimentos",
            transactions: [
                { title: "Aplicação CDB", amount: -1500.00, date: "2025-09-15" },
                { title: "Resgate CDB", amount: 1520.00, date: "2025-10-15" },
            ],
            bank: { code: "237", name: "Bradesco" },
            number: "32456-1",
            balance: 24,
        },
        {
            id: '4',
            title: "PJ - Empresa Alpha",
            transactions: [
                { title: "Receita - Projeto A", amount: 12000.00, date: "2025-09-25" },
                { title: "Pagamento - Fornecedor X", amount: -3000.00, date: "2025-09-28" },
                { title: "Impostos", amount: -1200.00, date: "2025-09-30" },
            ],
            bank: { code: "341", name: "Itaú Unibanco" },
            number: "55896-3",
            balance: 231223,
        },
        {
            id: '5',
            title: "PJ - Beta Studio",
            transactions: [
                { title: "Pagamento cliente Beta", amount: 8700.00, date: "2025-10-04" },
                { title: "Compra equipamentos", amount: -2500.00, date: "2025-10-07" },
            ],
            bank: { code: "260", name: "NuBank" },
            number: "67122-9",
            balance: 24222,
        },
        {
            id: '6',
            title: "Digital - Pessoal",
            transactions: [
                { title: "Pix recebido", amount: 240.00, date: "2025-10-09" },
                { title: "Assinatura Netflix", amount: -55.90, date: "2025-10-10" },
            ],
            bank: { code: "077", name: "Inter" },
            number: "93215-0",
            balance: 54445,
        },
        {
            id: '7',
            title: "Universitária",
            transactions: [
                { title: "Mensalidade faculdade", amount: -980.00, date: "2025-09-05" },
                { title: "Depósito pais", amount: 1000.00, date: "2025-09-04" },
            ],
            bank: { code: "033", name: "Santander" },
            number: "87455-1",
            balance: 6544,
        },
        {
            id: '8',
            title: "Pagamentos Online",
            transactions: [
                { title: "Recebimento via PayPal", amount: 620.00, date: "2025-09-22" },
                { title: "Taxa de serviço", amount: -15.00, date: "2025-09-23" },
            ],
            bank: { code: "212", name: "Original" },
            number: "74233-0",
            balance: 233322,
        },
        {
            id: '9',
            title: "Freelancer",
            transactions: [
                { title: "Projeto Web", amount: 3500.00, date: "2025-09-20" },
                { title: "Compra de domínio", amount: -70.00, date: "2025-09-22" },
            ],
            bank: { code: "260", name: "NuBank" },
            number: "55133-7",
            balance: 54354,
        }
    ]
}