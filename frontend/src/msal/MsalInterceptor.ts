import { enviroment } from './../enviroments/enviroment';
import { MsalInterceptorConfiguration} from '@azure/msal-angular';
import {InteractionType} from '@azure/msal-browser';

export function msalInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>([
    [`${enviroment.apiBaseURL}/*`, Object.keys(enviroment.azure.protectedResourceScopes)]
  ]);
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
};
