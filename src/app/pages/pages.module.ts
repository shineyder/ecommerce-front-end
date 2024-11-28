import { NgModule } from '@angular/core';
/* import { NbMenuModule } from '@nebular/theme'; */

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
/* import { ResourcesModule } from './resources/resources.module';
import { HomeAdmModule } from './home-adm/home-adm.module'; */
import { RoleGuard } from './role-guard.service';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    /* NbMenuModule, */
    DashboardModule,/* ,
    HomeAdmModule,
    ResourcesModule, */
  ],
  declarations: [
    PagesComponent,
  ],
  providers: [
    RoleGuard,
  ]
})
export class PagesModule {
}
