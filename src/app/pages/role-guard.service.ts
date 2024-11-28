import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { NbToastrService } from "@nebular/theme";
import { StorageService } from "../storage.service";

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly toastrService: NbToastrService,
    private readonly localStorageService: StorageService
    )
  {
  }

  canActivate() {
    let authUser = this.localStorageService.get('auth_user')
    if (!authUser.isAdmin) {
      this.router.navigate(['/dashboard']);
      this.toastrService.show('Você não tem permissão para acessar essa página!', 'Alerta!', { status: 'warning' })
    }
    return true;
  }
}
