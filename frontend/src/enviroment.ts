

export const enviroment = {
  production: false,
  azure: {
    clientId:'',
    tenantId:'',
    authority: 'https://login.microsoftonline.com/pon-tu-tenant-id',
    redirectUri: 'http://localhost:4200',

    protectedResourceScopes: {'api://tu-api-id-uri/tu-scopes': ['tu-scopes']}
  },
  apiBaseURL: 'http://localhost:8080/api'
};
