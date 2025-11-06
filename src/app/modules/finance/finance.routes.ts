import { Route } from "@angular/router";
import { FinanceDashboard } from "./finance-dashboard/finance-dashboard";
import { FinanceAccounts } from "./finance-accounts/finance-accounts";
import { FinanceAccountsStatement } from "./finance-accounts/finance-accounts-statement/finance-accounts-statement";

export const financeRoutes: Route =
{
    path: 'financeiro',
    children: [
        {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
        },
        {
            path: 'dashboard',
            component: FinanceDashboard,
        },
        {
            path: 'contas',
            children: [
                {
                    path: '',
                    component: FinanceAccounts,
                },
                {
                    path: ':id',
                    component: FinanceAccountsStatement,
                }
            ]
        }
    ]
}
