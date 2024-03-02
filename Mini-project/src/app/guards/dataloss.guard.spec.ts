import { TestBed } from '@angular/core/testing';

import { DatalossGuard } from './dataloss.guard';

describe('DatalossGuard', () => {
  let guard: DatalossGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DatalossGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
