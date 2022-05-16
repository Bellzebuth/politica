import { TestBed } from '@angular/core/testing';

import { Error404Guard } from './error404.guard';

describe('Error404Guard', () => {
  let guard: Error404Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Error404Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
