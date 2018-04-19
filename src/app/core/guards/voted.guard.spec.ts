import { TestBed, async, inject } from '@angular/core/testing';

import { VotedGuard } from './voted.guard';

describe('VotedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VotedGuard]
    });
  });

  it('should ...', inject([VotedGuard], (guard: VotedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
