import {
  Injectable,
  OnDestroy
} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable,
  Subject
} from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly localStorageService: StorageService)
  {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokenValid = this.localStorageService.get('auth_app_token')

    if (tokenValid == null) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${tokenValid.value}`),
    });

    return next.handle(req1).pipe(
      map((event: HttpEvent<any>) => {return event})
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
