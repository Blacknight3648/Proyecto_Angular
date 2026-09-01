import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // MSAL depends on browser-only APIs (window, localStorage) and the
    // root route is guarded by MsalGuard, so it cannot be prerendered
    // or rendered on the server.
    path: '**',
    renderMode: RenderMode.Client
  }
];
