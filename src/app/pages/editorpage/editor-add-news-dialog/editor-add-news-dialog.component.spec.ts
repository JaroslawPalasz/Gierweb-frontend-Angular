import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorAddNewsDialogComponent } from './editor-add-news-dialog.component';

describe('EditorNewsDialogComponent', () => {
  let component: EditorAddNewsDialogComponent;
  let fixture: ComponentFixture<EditorAddNewsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorAddNewsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorAddNewsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
