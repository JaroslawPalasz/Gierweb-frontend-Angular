import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewsService } from 'src/app/services/news/news.service';


@Component({
  selector: 'app-editor-add-news-dialog',
  templateUrl: './editor-add-news-dialog.component.html',
  styleUrls: ['./editor-add-news-dialog.component.css']
})
export class EditorAddNewsDialogComponent implements OnInit {

  form!: FormGroup
  userId?: string | undefined

  header = new FormControl('')
  text = new FormControl('', [Validators.required])
  imageLink = new FormControl('')

  constructor(
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private dialogRef: MatDialogRef<EditorAddNewsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.userId = data.userId
    }



  ngOnInit(): void {
    console.log(this.userId)
    this.form = this.formBuilder.group({
      header: this.header,
      text: this.text,
      imageLink: this.imageLink,
    })
  }

  submit(): void {
    console.log(this.form.value)
    this.newsService.createNews(this.form.value).subscribe((res) => {
      this.dialogRef.close(this.form.value)
    })
  }

  close() {
    this.dialogRef.close()
  }

}
