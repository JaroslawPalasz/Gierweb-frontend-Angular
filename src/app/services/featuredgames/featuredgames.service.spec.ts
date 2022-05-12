import { TestBed } from '@angular/core/testing';

import { FeaturedgamesService } from './featuredgames.service';

describe('FeaturedgamesService', () => {
  let service: FeaturedgamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeaturedgamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
