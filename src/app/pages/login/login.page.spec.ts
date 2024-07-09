import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPage } from './login.page';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { of } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let navCtrl: NavController;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(waitForAsync(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        NavController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    navCtrl = TestBed.inject(NavController);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  }));

  beforeEach(() => {
    fixture.detectChanges(); // Detect changes to ensure components are properly initialized
  });

  it('should navigate to /attendance on successful login', async () => {
    const navigateSpy = spyOn(navCtrl, 'navigateForward');

    // Mock login success
    authService.login.and.returnValue(Promise.resolve(true));

    // Trigger login method
    await component.logIn();
    fixture.detectChanges(); // Ensure changes are detected after async operations

    expect(component.loginSuccess).toBeTruthy();
    expect(navigateSpy).toHaveBeenCalledWith('/attendance');
  });

  it('should handle login error', async () => {
    // Mock login error
    authService.login.and.returnValue(Promise.reject('Invalid credentials'));

    // Trigger login method
    await component.logIn();
    fixture.detectChanges(); // Ensure changes are detected after async operations

    expect(component.loginError).toBeTruthy();
    expect(component.loginSuccess).toBeFalsy();
  });
});
