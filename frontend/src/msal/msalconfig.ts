import {PublicClientApplication, IPublicClientApplication, LogLevel } from '@azure/msal-browser';

export function msalInstanceFactory(): IPublicClientApplication {
    return new PublicClientApplication({
    auth: {
        clientId: 
        authority:
        redirectUri: window.location.origin
    },
    cache: {cacheLocation: 'localStorage'
    }
});
}
