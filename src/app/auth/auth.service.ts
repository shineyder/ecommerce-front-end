import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { getDeepFromObject, NbAuthService, NB_AUTH_OPTIONS } from "@nebular/auth";
import { Router } from "@angular/router";
import { User } from "../pages/home/models/user.model";
import { map, takeUntil } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { StorageService } from "../storage.service";
import { NbToastrService } from "@nebular/theme";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private readonly ngUnsubscribe = new Subject<void>();

  constructor(
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    private readonly http: HttpClient,
    private readonly nbAuthService: NbAuthService,
    private readonly router: Router,
    private readonly localStorageService: StorageService,
    private readonly toastrService: NbToastrService,
  ) {
  }

  getUserAuthenticated(): Observable<User> {
    return this.http.get<User>(`${environment.baseURL}/users/me`)
    .pipe(map((obj) => obj));
  }

  doLogout(): void {
    this.logout()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe({
      next: (result) => {
        this.nbAuthService.logout('email')
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((result => {
          this.localStorageService.remove('auth_user')
          this.localStorageService.remove('auth_app_token')
          this.router.navigate(['auth/login']);
        }));
      },
      error: error => {
        this.toastrService.show('Falha ao deslogar!', 'Erro', { status: 'warning' })
      }
    });
  }

  logout(): Observable<any> {
    let tokenOld = this.localStorageService.get('auth_app_token')
    return this.http.post(`${environment.baseURL}/users/logout`, {"token": `${tokenOld.value}`});
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
