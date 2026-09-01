import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalInterceptor, MsalGuard, MsalService, MsalBroadcastService} from '@azure/msal-angular';
import { provideRouter, Routes } from '@angular/router';
import { msalInterceptorConfigFactory } from './msal/MsalInterceptor';


const routes: Routes = [
{path : '', component: App, canActivate: [MsalGuard]},
{path : '**', redirectTo: ''}] ;

bootstrapApplication(App,{
  ...appConfig,
  providers: [provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {provide: MSAL_INSTANCE, useFactory: MsalService},
    {provide: MSAL_GUARD_CONFIG, useFactory: msalInterceptorConfigFactory},
    {provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true},

    MsalGuard,
    MsalService,
    MsalBroadcastService
  ]})
  .catch((err) => console.error(err));

