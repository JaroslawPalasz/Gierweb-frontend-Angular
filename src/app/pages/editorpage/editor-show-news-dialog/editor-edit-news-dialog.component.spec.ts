import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorEditNewsDialogComponent } from './editor-edit-news-dialog.component';

describe('EditorShowNewsDialogComponent', () => {
  let component: EditorEditNewsDialogComponent;
  let fixture: ComponentFixture<EditorEditNewsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorEditNewsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorEditNewsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
