import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProfilePage } from './profile.page';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

// Importa el servicio y el modelo necesario
import { DbsqlService } from 'src/app/services/database/dbsql.service';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;
  let dbsqlService: jasmine.SpyObj<DbsqlService>;

  beforeEach(waitForAsync(() => {
    // Crea un SpyObj para el servicio DbsqlService
    const dbsqlServiceSpy = jasmine.createSpyObj('DbsqlService', ['getUser', 'updateUser']);

    TestBed.configureTestingModule({
      declarations: [ProfilePage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        { provide: DbsqlService, useValue: dbsqlServiceSpy }
      ]
    }).compileComponents();

    // Inyecta el servicio y obtén la instancia del componente
    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    dbsqlService = TestBed.inject(DbsqlService) as jasmine.SpyObj<DbsqlService>;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data on init', () => {
    // Datos de prueba para simular el retorno del servicio
    const userData = {
      user: 'testUser',
      name: 'Test',
      lastName: 'User',
      password: 'test123',
      email: 'test@test.com',
      address: 'Test Address',
      companyName: 'Test Company',
      dateBirth: '1990-01-01'
    };

    // Configura el servicio para devolver los datos de prueba cuando se llame a getUser()
    dbsqlService.getUser.and.returnValue(of(userData));

    // Llama al método ngOnInit() del componente
    component.ngOnInit();

    // Verifica que el usuario cargado sea igual a los datos de prueba
    expect(component.user).toEqual(userData);
    expect(dbsqlService.getUser).toHaveBeenCalled();
  });

  it('should save user changes', () => {
    // Datos de prueba para simular la actualización del usuario
    const updatedUserData = {
      user: 'testUser',
      name: 'Updated Test',
      lastName: 'User',
      password: 'newPassword',
      email: 'updated@test.com',
      address: 'Updated Address',
      companyName: 'Updated Company',
      dateBirth: '1990-01-01'
    };

    // Configura el servicio para resolver cuando se llame a updateUser()
    dbsqlService.updateUser.and.returnValue(of('Update successful'));

    // Asigna los datos de prueba al componente
    component.user = updatedUserData;

    // Llama al método saveChanges() del componente
    component.saveChanges();

    // Verifica que se haya llamado a updateUser() con los datos actualizados del usuario
    expect(dbsqlService.updateUser).toHaveBeenCalledWith(updatedUserData);
    expect(component.editMode).toBeFalse(); // Verifica que editMode sea false después de guardar cambios
  });

  it('should log out user', () => {
    // Simula el clic en el botón de cerrar sesión
    const navigateSpy = spyOn((<any>component).router, 'navigate');

    // Llama al método logOut() del componente
    component.logOut();

    // Verifica que se haya removido 'user' del localStorage
    expect(localStorage.getItem('user')).toBeNull();

    // Verifica que se haya navegado a la ruta '/login'
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
