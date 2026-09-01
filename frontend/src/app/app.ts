import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterOutlet, NgIf]
})
export class App {
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
