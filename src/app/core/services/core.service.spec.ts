import { TestBed, inject } from '@angular/core/testing';

import { CandidateService } from '@app/core/services/candidate.service';

describe('CandidateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandidateService]
    });
  });

  it('should be created', inject([CandidateService], (service: CandidateService) => {
    expect(service).toBeTruthy();
  }));
});
