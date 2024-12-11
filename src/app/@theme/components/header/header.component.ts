import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  NbComponentStatus,
  NbMenuService,
  NbToastrService
} from '@nebular/theme';

import {
  filter,
  takeUntil
} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../pages/home/models/user.model';
import { StorageService } from '../../../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject<void>();
  user: User

  currentTheme = 'default';

  userMenu = [
    /* { title: 'Profile' }, */
    { title: 'Sair' }
  ];

  menuWithoutUser = [
    {
      title: 'Login',
      link: 'auth/login',
      icon: 'person-outline',
    }
  ];

  constructor(
    private readonly menuService: NbMenuService,
    private readonly userAuthService: AuthService,
    private readonly localStorageService: StorageService,
    private readonly toastrService: NbToastrService,
    private readonly router: Router,
  ) {
  }

  ngOnInit() {
    if(this.localStorageService.get('auth_app_token') != null){
      this.userAuthService.getUserAuthenticated()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user) => {
          this.localStorageService.set('auth_user', user)
          this.user = user
        },
        error: (error) => {
          this.localStorageService.clear()
          this.router.navigate(['auth/login']);
        }
      });
    }else{
      this.localStorageService.clear();
    }

    this.menuService.onItemClick()
    .pipe(
      filter(({ tag }) => tag === 'userMenu'),
      takeUntil(this.destroy$),
    )
    .subscribe((menu: any) => {
      if(menu.item.title == 'Sair'){
        this.userAuthService.doLogout()
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  showMessage(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, { status });
  }
}
