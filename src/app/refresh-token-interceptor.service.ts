import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { mergeMap, tap } from "rxjs/operators";
import { AuthInterceptor } from './auth-interceptor.service';
import { environment } from '../environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenInterceptorService implements HttpInterceptor {

  constructor(
    private readonly http: HttpClient,
    private readonly authInterceptor: AuthInterceptor,
    private readonly localStorageService: StorageService,
  )
  {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      tap({
        error: error => {
          const responseError = error as HttpErrorResponse;
          if (responseError.status === 401) {
            let tokenOld = this.localStorageService.get('auth_app_token')

            if (tokenOld == null) {
              return next.handle(req);
            }

            if (req.url == `${environment.baseURL}/users/refresh`){
              this.localStorageService.clear();
              return next.handle(req);
            }

            return this.http.post<any>(
              `${environment.baseURL}/users/refresh`,
              {"token": `${tokenOld.value}`}
            )
            .pipe(
              tap({
                next: response => {
                  tokenOld.value = response.token
                  this.localStorageService.set('auth_app_token', tokenOld)
                },
                error: error => {
                  this.localStorageService.remove("auth_app_token")
                }
              }),
              mergeMap(() => this.authInterceptor.intercept(req, next))
            );
          }
          return error;
        }
      })
    );
  }
}
