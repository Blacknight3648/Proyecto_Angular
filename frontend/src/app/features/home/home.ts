import { Component, signal } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected readonly title = signal('frontend-simple');

  constructor(private msal: MsalService) {}

  isLoggedIn(): boolean {
    return this.msal.instance.getAllAccounts().length > 0;
  }

  login(): void {
    this.msal.loginRedirect();
  }

  logout(): void {
    this.msal.logoutRedirect();
  }
}
