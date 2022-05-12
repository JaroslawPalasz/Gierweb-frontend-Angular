import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeShowNewsDialogComponent } from './home-show-news-dialog.component';

describe('HomeShowNewsDialogComponent', () => {
  let component: HomeShowNewsDialogComponent;
  let fixture: ComponentFixture<HomeShowNewsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeShowNewsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeShowNewsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
