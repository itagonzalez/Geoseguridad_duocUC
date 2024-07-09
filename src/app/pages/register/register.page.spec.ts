import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { RegisterPage } from './register.page';
import { DbsqlService } from 'src/app/services/database/dbsql.service';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let dbServiceSpy: jasmine.SpyObj<DbsqlService>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;

  beforeEach(waitForAsync(() => {
    const dbServiceMock = jasmine.createSpyObj('DbsqlService', ['addUser']);
    const navCtrlMock = jasmine.createSpyObj('NavController', ['navigateBack', 'back']);

    TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: DbsqlService, useValue: dbServiceMock },
        { provide: NavController, useValue: navCtrlMock }
      ]
    }).compileComponents();

    dbServiceSpy = TestBed.inject(DbsqlService) as jasmine.SpyObj<DbsqlService>;
    navCtrlSpy = TestBed.inject(NavController) as jasmine.SpyObj<NavController>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the register form', () => {
    expect(component.formRegister).toBeDefined();
    expect(component.formRegister.get('user')).toBeDefined();
    expect(component.formRegister.get('password')).toBeDefined();
    expect(component.formRegister.get('email')).toBeDefined();
    expect(component.formRegister.get('address')).toBeDefined();
    expect(component.formRegister.get('name')).toBeDefined();
    expect(component.formRegister.get('lastName')).toBeDefined();
    expect(component.formRegister.get('companyName')).toBeDefined();
    expect(component.formRegister.get('dateBirth')).toBeDefined();
  });

  it('should display validation error messages when fields are invalid and touched', () => {
    const userControl = component.formRegister.get('user');
    userControl?.markAsTouched();
    fixture.detectChanges();
    const errorMsg = fixture.debugElement.query(By.css('ion-note[color="danger"]'));
    expect(errorMsg.nativeElement.textContent).toContain('El usuario debe ser alfanumérico y tener entre 3 y 8 caracteres.');
  });

  it('should call addUser on dbService when the form is valid', waitForAsync(() => {
    const formData = {
      user: 'validUser',
      password: '1234',
      email: 'test@example.com',
      address: 'Some Address',
      name: 'John',
      lastName: 'Doe',
      companyName: 'Company',
      dateBirth: '1990-01-01'
    };

    component.formRegister.setValue(formData);
    dbServiceSpy.addUser.and.returnValue(of({ success: true }));
    component.register();

    fixture.whenStable().then(() => {
      expect(dbServiceSpy.addUser).toHaveBeenCalledWith(formData);
    });
  }));

  it('should display success message and navigate back on successful registration', waitForAsync(() => {
    const formData = {
      user: 'validUser',
      password: '1234',
      email: 'test@example.com',
      address: 'Some Address',
      name: 'John',
      lastName: 'Doe',
      companyName: 'Company',
      dateBirth: '1990-01-01'
    };

    component.formRegister.setValue(formData);
    dbServiceSpy.addUser.and.returnValue(of({ success: true }));
    component.register();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const successMsg = fixture.debugElement.query(By.css('ion-note[color="success"]'));
      expect(successMsg.nativeElement.textContent).toContain('Usuario registrado correctamente.');
      expect(navCtrlSpy.navigateBack).toHaveBeenCalledWith(['/login']);
    });
  }));

  it('should display error message on registration failure', waitForAsync(() => {
    const formData = {
      user: 'validUser',
      password: '1234',
      email: 'test@example.com',
      address: 'Some Address',
      name: 'John',
      lastName: 'Doe',
      companyName: 'Company',
      dateBirth: '1990-01-01'
    };

    component.formRegister.setValue(formData);
    dbServiceSpy.addUser.and.returnValue(throwError('Error during registration'));
    component.register();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const errorMsg = fixture.debugElement.query(By.css('ion-note[color="danger"]'));
      expect(errorMsg.nativeElement.textContent).toContain('Error durante el registro');
      expect(component.success).toBeFalse(); // Ensure component state is correctly updated
    });
  }));

  it('should navigate back when goBack is called', () => {
    component.goBack();
    expect(navCtrlSpy.back).toHaveBeenCalled();
  });
});

