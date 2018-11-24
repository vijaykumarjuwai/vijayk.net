import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpClient,
    HttpResponse,
    HttpEvent
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const idToken = this.auth.getToken();
        if (idToken) {
            console.log('Intercepted');
            const cloned = req.clone({
                headers: req.headers
                    .set('Authorization', `Bearer ${idToken}`)
            });

            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}
