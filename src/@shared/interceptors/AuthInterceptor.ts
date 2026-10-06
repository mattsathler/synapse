import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/auth-service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    const token = authService.token();

    if (!token) {
        return next(req).pipe(
            catchError((error) => {
                if (error?.status === 401) {
                    authService.logout();
                    router.navigate(['/login']);
                }
                return throwError(() => error);
            })
        );;
    }

    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    return next(authReq).pipe(
        catchError((error) => {
            if (error?.status === 401) {
                const message = error?.error?.message || error?.message;
                authService.logout();
                router.navigate(['/login']);
            }
            return throwError(() => error);
        })
    );;
};
