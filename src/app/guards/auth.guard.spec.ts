import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from 'src/app/services/auth/auth-service.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(true)
          }
        }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow the authenticated user to access app', () => {
    (authService.isAuthenticated as jasmine.Spy).and.returnValue(true);
    expect(authGuard.canActivate({} as any, {} as any)).toBe(true);
  });

  it('should not allow the unauthenticated user to access app and redirect to login', () => {
    (authService.isAuthenticated as jasmine.Spy).and.returnValue(false);
    const navigateSpy = spyOn(router, 'navigate');
    expect(authGuard.canActivate({} as any, {} as any)).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
