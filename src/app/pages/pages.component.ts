import { Component } from '@angular/core';

/* import { MENU_ITEMS } from './pages-menu'; */

@Component({
  selector: 'app-ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <app-ngx-one-column-layout>
      <!-- <nb-menu [items]="menu"></nb-menu> -->
      <router-outlet></router-outlet>
    </app-ngx-one-column-layout>
  `,
})
export class PagesComponent {
  /* menu = MENU_ITEMS; */
}
