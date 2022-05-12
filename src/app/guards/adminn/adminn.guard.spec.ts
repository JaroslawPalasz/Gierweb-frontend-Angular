import { TestBed } from '@angular/core/testing';

import { AdminnGuard } from './adminn.guard';

describe('AdminnGuard', () => {
  let guard: AdminnGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminnGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
