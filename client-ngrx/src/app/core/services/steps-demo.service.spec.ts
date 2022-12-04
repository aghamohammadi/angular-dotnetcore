import { TestBed } from '@angular/core/testing';

import { StepsDemoService } from './steps-demo.service';

describe('StepsDemoService', () => {
  let service: StepsDemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepsDemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
