import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { StorageService } from './storage.service';

@Injectable()
export class MultipleSessionGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly toastrService: NbToastrService,
    private readonly localStorageService: StorageService
    ) {
  }

  canActivate() {
    if (this.localStorageService.get('auth_app_token') != null) {
      this.router.navigate(['/dashboard']);
      this.toastrService.show('Encerre a sessão atual antes de iniciar uma nova sessão!', 'Alerta!', { status: 'warning' })
    }
    return true;
  }
}
