import { TestBed } from '@angular/core/testing';

import { NewsGuard } from './news.guard';

describe('NewsGuard', () => {
  let guard: NewsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NewsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
