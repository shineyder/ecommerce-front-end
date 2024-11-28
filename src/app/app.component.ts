/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ngx',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  private connectionToastr: any;

  constructor(private readonly toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.createOnline$().subscribe(isOnline => {
      if (!isOnline){
        this.connectionToastr = this.toastrService.show('Aparentemente não há conexão com a internet!', 'Erro', { status: 'warning', duration: 0 })
      }

      if (isOnline && this.connectionToastr != undefined) {
        this.connectionToastr.close()
      }
    })
  }

  createOnline$() {
    return merge(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }
}
