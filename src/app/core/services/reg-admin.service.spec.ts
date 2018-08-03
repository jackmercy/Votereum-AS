import { TestBed, inject } from '@angular/core/testing';

import { RegAdminService } from './reg-admin.service';

describe('RegAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegAdminService]
    });
  });

  it('should be created', inject([RegAdminService], (service: RegAdminService) => {
    expect(service).toBeTruthy();
  }));
});
