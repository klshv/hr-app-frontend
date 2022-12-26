import { TestBed } from '@angular/core/testing';

import { PersonalFileService } from './personal-file.service';

describe('PersonalFileService', () => {
  let service: PersonalFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
