import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NbAuthJWTToken,
  NbAuthModule,
  NbPasswordAuthStrategy
} from '@nebular/auth';

import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule
} from '@nebular/theme';
import { environment } from '../../environments/environment';

import { AuthService } from './auth.service';

import { NgxLoginComponent } from './login/login.component';
import { NgxRegisterComponent } from './register/register.component';
import { NgxAuthRoutingModule } from './auth-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,

    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',

          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },

          baseEndpoint: environment.baseURL,
          login: {
            endpoint: '/users/login',
            method: 'post',
            redirect: {
              success: '/',
              failure: null,
            },
          },
          register: {
            endpoint: '/users/register',
            method: 'post',
            redirect: {
              success: '/auth/login',
              failure: null,
            },
            requireValidToken: false,
            defaultMessages: ['Conta criada com sucesso!'],
          },
          errors: {
            key: 'errors'
          }
        }),
      ],
      forms: {
        login: {
          redirectDelay: 0,
          strategy: 'email',
          showMessages: {
            success: true,
            error: true,
          },
        },
        register: {
          redirectDelay: 0,
          strategy: 'email',
          showMessages: {
            success: false,
            error: true,
          }
        },
        validation: {
          password: {
            required: true,
            minLength: 4,
            maxLength: 16,
            regexp: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=.]).{4,16}$'
          },
          email: {
            required: true,
            maxLength: 256,
          },
          fullName: {
            required: true,
            minLength: 3,
            maxLength: 255,
            regexp: '^[A-Za-z][A-Za-z ]*[A-Za-z]$',
          }
        }
      },
    }),
  ],
  declarations: [
    NgxLoginComponent,
    NgxRegisterComponent,
  ],
  providers: [
    AuthService,
  ]
})
export class NgxAuthModule {
}
