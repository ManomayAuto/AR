import { TestBed } from '@angular/core/testing';

import { Rep1Service } from './rep1.service';

describe('Rep1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Rep1Service = TestBed.get(Rep1Service);
    expect(service).toBeTruthy();
  });
});
