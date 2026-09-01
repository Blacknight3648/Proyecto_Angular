import {PublicClientApplication, IPublicClientApplication, LogLevel } from '@azure/msal-browser';
import { enviroment } from '../enviroments/enviroment';

export function msalInstanceFactory(): IPublicClientApplication {
    return new PublicClientApplication({
    auth: {
        clientId: enviroment.azure.clientId,
        authority: enviroment.azure.authority,
        redirectUri: window.location.origin
    },
    cache: {cacheLocation: 'localStorage'
    }
});
}
