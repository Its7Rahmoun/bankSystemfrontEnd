import { TestBed } from '@angular/core/testing';

import { AuthorozitionGuard } from './authorozition.guard';

describe('AuthorozitionGuard', () => {
  let guard: AuthorozitionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorozitionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
