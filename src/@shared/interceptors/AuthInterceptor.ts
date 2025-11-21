import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../app/modules/auth/auth-service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');
    const router = inject(Router);
    const authService = inject(AuthService);

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
                if (message === 'Invalid token' || message === 'Missing Authorization header') {
                    authService.logout();
                    router.navigate(['/login']);
                }
            }
            return throwError(() => error);
        })
    );;
};
