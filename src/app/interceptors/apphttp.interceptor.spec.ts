import { TestBed } from '@angular/core/testing';

import { ApphttpInterceptor } from './apphttp.interceptor';

describe('ApphttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApphttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApphttpInterceptor = TestBed.inject(ApphttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
