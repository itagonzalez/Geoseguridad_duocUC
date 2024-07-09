import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth-service.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully', async () => {
    const mockResponse = { success: true, token: 'test-token' };
    const user = 'testUser';
    const password = 'testPassword';

    service.login(user, password).then((result) => {
      expect(result).toBeTrue();
      expect(localStorage.getItem('token')).toBe('test-token');
      expect(localStorage.getItem('user')).toBe(user);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should logout successfully', () => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('user', 'testUser');

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('should return true if authenticated', () => {
    localStorage.setItem('token', 'test-token');

    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false if not authenticated', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should return the user', () => {
    const user = 'testUser';
    localStorage.setItem('user', user);

    expect(service.getUser()).toBe(user);
  });

  it('should return null if no user is logged in', () => {
    expect(service.getUser()).toBeNull();
  });
});
