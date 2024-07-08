import { TestBed } from '@angular/core/testing';
import { RegisterHistoryService } from './register-history.service';
import { DbsqlService } from '../database/dbsql.service';
import { of, throwError } from 'rxjs';

describe('RegisterHistoryService', () => {
  let service: RegisterHistoryService;
  let dbServiceSpy: jasmine.SpyObj<DbsqlService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DbsqlService', ['addTimestamp', 'getTimestamps']);
    TestBed.configureTestingModule({
      providers: [
        RegisterHistoryService,
        { provide: DbsqlService, useValue: spy }
      ]
    });
    service = TestBed.inject(RegisterHistoryService);
    dbServiceSpy = TestBed.inject(DbsqlService) as jasmine.SpyObj<DbsqlService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add timestamps', async () => {
    const userId = 1;
    const checkIn = new Date();
    const checkOut = new Date();
    dbServiceSpy.addTimestamp.and.returnValue(of(null));

    await service.addTimestamps(userId, checkIn, checkOut);

    expect(dbServiceSpy.addTimestamp.calls.count()).toBe(1);
    expect(dbServiceSpy.addTimestamp.calls.mostRecent().args[0]).toBe(userId);
  });

  it('should handle error when adding timestamps', async () => {
    const userId = 1;
    const checkIn = new Date();
    const checkOut = new Date();
    const errorResponse = new Error('test error');
    dbServiceSpy.addTimestamp.and.returnValue(throwError(errorResponse));

    await expectAsync(service.addTimestamps(userId, checkIn, checkOut)).toBeRejectedWith(errorResponse);
    expect(dbServiceSpy.addTimestamp.calls.count()).toBe(1);
  });

  it('should get history and sort it by date', async () => {
    const userId = 1;
    const timestamps = [
      { userId, date: new Date('2023-07-02T08:00:00Z'), checkIn: new Date('2023-07-02T08:00:00Z'), checkOut: new Date('2023-07-02T17:00:00Z') },
      { userId, date: new Date('2023-07-01T08:00:00Z'), checkIn: new Date('2023-07-01T08:00:00Z'), checkOut: new Date('2023-07-01T17:00:00Z') }
    ];
    dbServiceSpy.getTimestamps.and.returnValue(of(timestamps));

    const history = await service.getHistory(userId);

    expect(history.length).toBe(2);
    expect(history[0].date).toEqual(new Date('2023-07-02T08:00:00Z'));
    expect(history[1].date).toEqual(new Date('2023-07-01T08:00:00Z'));
  });

  it('should handle error when getting history', async () => {
    const userId = 1;
    const errorResponse = new Error('test error');
    dbServiceSpy.getTimestamps.and.returnValue(throwError(errorResponse));

    await expectAsync(service.getHistory(userId)).toBeRejectedWith(errorResponse);
    expect(dbServiceSpy.getTimestamps.calls.count()).toBe(1);
  });
});
