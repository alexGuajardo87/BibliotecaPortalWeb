import { TestBed } from '@angular/core/testing';

import { CronogramaServiceTs } from './cronograma.service.ts';

describe('CronogramaServiceTs', () => {
  let service: CronogramaServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CronogramaServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
