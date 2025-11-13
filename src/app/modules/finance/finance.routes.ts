import { Route } from "@angular/router";
import { FinanceDashboard } from "./finance-dashboard/finance-dashboard";
import { FinanceAccounts } from "./finance-accounts/finance-accounts";
import { FinanceAccountsStatement } from "./finance-accounts/finance-accounts-statement/finance-accounts-statement";
import { authGuard } from "../auth/authGuard";

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
            canActivate: [authGuard],
            component: FinanceDashboard,
        },
        {
            path: 'contas',
            canActivate: [authGuard],
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
