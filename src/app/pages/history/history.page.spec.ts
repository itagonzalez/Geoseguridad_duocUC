import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HistoryPage } from './history.page';
import { RegisterHistoryService, Timestamp } from '../../services/history/register-history.service';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

describe('HistoryPage', () => {
  let component: HistoryPage;
  let fixture: ComponentFixture<HistoryPage>;
  let historyService: jasmine.SpyObj<RegisterHistoryService>;

  beforeEach(waitForAsync(() => {
    const historyServiceSpy = jasmine.createSpyObj('RegisterHistoryService', ['getHistory']);

    TestBed.configureTestingModule({
      declarations: [HistoryPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        { provide: RegisterHistoryService, useValue: historyServiceSpy }
      ]
    }).compileComponents();

    historyService = TestBed.inject(RegisterHistoryService) as jasmine.SpyObj<RegisterHistoryService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load history data on init', async () => {
    const testData: Timestamp[] = [
      { userId: 1, date: new Date('2024-07-08T08:00:00'), checkIn: new Date('2024-07-08T08:00:00'), checkOut: new Date('2024-07-08T17:00:00') },
      { userId: 1, date: new Date('2024-07-07T08:30:00'), checkIn: new Date('2024-07-07T08:30:00'), checkOut: new Date('2024-07-07T17:30:00') }
    ];
  
    historyService.getHistory.and.returnValue(Promise.resolve(testData));
  
    await component.ngOnInit();
    fixture.detectChanges();
  
    expect(component.historyTimestamps).toEqual(testData);
  });
});
