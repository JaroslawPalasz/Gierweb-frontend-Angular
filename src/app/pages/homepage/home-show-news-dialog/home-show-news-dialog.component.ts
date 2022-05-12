import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-home-show-news-dialog',
  templateUrl: './home-show-news-dialog.component.html',
  styleUrls: ['./home-show-news-dialog.component.css']
})
export class HomeShowNewsDialogComponent implements OnInit {

  news!: News


  constructor(
    private newsService: NewsService,
    private dialogRef: MatDialogRef<HomeShowNewsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.news = data.news
    }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close()
  }
}