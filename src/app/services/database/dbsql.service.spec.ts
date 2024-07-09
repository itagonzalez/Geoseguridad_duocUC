import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DbsqlService } from './dbsql.service';

describe('DbsqlService', () => {
  let service: DbsqlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DbsqlService]
    });
    service = TestBed.inject(DbsqlService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a user', () => {
    const userData = { user: 'testUser', name: 'Test', lastName: 'User' };

    service.addUser(userData).subscribe((response) => {
      expect(response).toEqual(userData);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/users`);
    expect(req.request.method).toBe('POST');
    req.flush(userData);
  });

  it('should get a user by username', () => {
    const username = 'testUser';
    const userData = { user: username, name: 'Test', lastName: 'User' };

    service.getUser(username).subscribe((response) => {
      expect(response).toEqual(userData);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/users/user/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(userData);
  });

  it('should update a user', () => {
    const userData = { id: 1, user: 'testUser', name: 'Test', lastName: 'User' };

    service.updateUser(userData).subscribe((response) => {
      expect(response).toEqual(userData);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/users/${userData.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(userData);
  });

  it('should add a timestamp for a user', () => {
    const userId = 1;
    const timestampData = { checkIn: '2023-07-01T08:00:00Z', checkOut: '2023-07-01T17:00:00Z' };

    service.addTimestamp(userId, timestampData).subscribe((response) => {
      expect(response).toEqual(timestampData);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/timestamps/user/${userId}`);
    expect(req.request.method).toBe('POST');
    req.flush(timestampData);
  });

  it('should get timestamps for a user', () => {
    const userId = 1;
    const timestamps = [
      { checkIn: '2023-07-01T08:00:00Z', checkOut: '2023-07-01T17:00:00Z' },
      { checkIn: '2023-07-02T08:00:00Z', checkOut: '2023-07-02T17:00:00Z' }
    ];

    service.getTimestamps(userId).subscribe((response) => {
      expect(response).toEqual(timestamps);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/timestamps/user/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(timestamps);
  });
});
