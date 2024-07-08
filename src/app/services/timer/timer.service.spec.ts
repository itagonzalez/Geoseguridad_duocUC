import { TestBed } from '@angular/core/testing';
import { TimerService } from './timer.service';

describe('TimerService', () => {
  let service: TimerService;
  let originalTimeout: number;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerService);
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; // Set a higher timeout interval for tests that involve setInterval
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout; // Reset the timeout interval
    service.stopTimer(); // Ensure the timer is stopped after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start the timer and update seconds', (done) => {
    service.startTimer();
    setTimeout(() => {
      expect(service.getSeconds()).toBeGreaterThan(0);
      done();
    }, 1500); // Wait 1.5 seconds to ensure the timer has ticked at least once
  });

  it('should update minutes and reset seconds after 60 seconds', (done) => {
    service.startTimer();
    service['sec'] = 59; // Manually set seconds to 59
    setTimeout(() => {
      expect(service.getSeconds()).toBe(0);
      expect(service.getMinutes()).toBe(1);
      done();
    }, 1500); // Wait 1.5 seconds to allow seconds to roll over
  });

  it('should update hours and reset minutes after 60 minutes', (done) => {
    service.startTimer();
    service['minutes'] = 59; // Manually set minutes to 59
    service['sec'] = 59; // Manually set seconds to 59
    setTimeout(() => {
      expect(service.getMinutes()).toBe(0);
      expect(service.getHours()).toBe(1);
      done();
    }, 1500); // Wait 1.5 seconds to allow minutes and seconds to roll over
  });

  it('should stop the timer and reset all values', () => {
    service.startTimer();
    service.stopTimer();
    expect(service.getSeconds()).toBe(0);
    expect(service.getMinutes()).toBe(0);
    expect(service.getHours()).toBe(0);
  });
});
