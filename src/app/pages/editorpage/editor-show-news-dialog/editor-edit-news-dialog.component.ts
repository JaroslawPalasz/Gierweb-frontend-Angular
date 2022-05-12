import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-editor-edit-news-dialog',
  templateUrl: './editor-edit-news-dialog.component.html',
  styleUrls: ['./editor-edit-news-dialog.component.css']
})
export class EditorEditNewsDialogComponent implements OnInit {

  form!: FormGroup
  news!: News | null

  header = new FormControl('')
  text = new FormControl('', [Validators.required])
  imageLink = new FormControl('')
  id = new FormControl('')
  userId = new FormControl('')

  constructor(
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private dialogRef: MatDialogRef<EditorEditNewsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.userId = data.userId
      this.news = data.news
      this.text = data.text
      this.imageLink = data.imageLink
      this.id = data.id
      this.userId = data.userId
    }

  ngOnInit(): void {
    console.log(this.userId)
    console.log(this.news?.id)
    this.form = this.formBuilder.group({
      header: this.news?.text!.slice(0, 24),
      text: this.news?.text,
      imageLink: this.news?.imageLink,
      id: this.news?.id,
      userId: this.news?.userId
    })
  }

  submit(): void {
    console.log(this.form.value)
    this.newsService.editNews(this.form.value.id, this.form.value).subscribe((res) => {
      this.dialogRef.close(this.form.value)
    })
  }

  deleteNews() {
    this.newsService.deleteNews(this.form.value.id).subscribe((res) => {
      this.dialogRef.close(this.form.value)
    })
  }

  close() {
    this.dialogRef.close()
  }
}
