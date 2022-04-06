import { TestBed } from '@angular/core/testing';

import { DebateGuard } from './debate.guard';

describe('DebateGuard', () => {
  let guard: DebateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DebateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
