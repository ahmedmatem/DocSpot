import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { catchError, throwError } from "rxjs";

export const authInterceptor : HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const auth = inject(AuthService);
    const token = auth.accessToken;

    const authReq = token ? req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    }) : req;

    return next(authReq).pipe(
        catchError((err: HttpErrorResponse) => {
            if (err.status === 401) {
                // Option A: simple logout on 401
                auth.logout();
                // Option B (advanced): try refresh token flow here before logout.
            }
            return throwError(() => err);
        })
    );
}