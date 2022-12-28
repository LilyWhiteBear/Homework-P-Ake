import { TestBed } from '@angular/core/testing';

import { FormValueService } from './form-value.service';

describe('FormValueService', () => {
  let service: FormValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
