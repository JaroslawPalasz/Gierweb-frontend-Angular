import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameShowTagsDialogComponent } from './game-show-tags-dialog.component';

describe('GameShowTagsDialogComponent', () => {
  let component: GameShowTagsDialogComponent;
  let fixture: ComponentFixture<GameShowTagsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameShowTagsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameShowTagsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
