import { TestBed } from '@angular/core/testing';
import { MsalService } from '@azure/msal-angular';
import { Home } from './home';

class MsalServiceStub {
  instance = { getAllAccounts: () => [] };
}

describe('Home', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [{ provide: MsalService, useClass: MsalServiceStub }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Home);
    const home = fixture.componentInstance;
    expect(home).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('frontend-simple');
  });
});
