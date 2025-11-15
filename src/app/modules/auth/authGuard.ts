import { inject } from "@angular/core";
import { AuthService } from "./auth-service";
import { Router } from "@angular/router";

export const authGuard = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    const employee = auth.employee();

    if (employee) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
};