import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tag } from 'src/app/models/tag';

@Component({
  selector: 'app-game-show-tags-dialog',
  templateUrl: './game-show-tags-dialog.component.html',
  styleUrls: ['./game-show-tags-dialog.component.css']
})
export class GameShowTagsDialogComponent implements OnInit {

  tags!: Tag[]

  constructor(
    private dialogRef: MatDialogRef<GameShowTagsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.tags = data.tags
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close()
  }
}
