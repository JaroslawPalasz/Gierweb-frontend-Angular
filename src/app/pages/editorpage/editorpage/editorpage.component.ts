import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user';
import { take } from 'rxjs/operators';
import { RolesService } from 'src/app/services/roles/roles.service';
import { Roles } from 'src/app/models/roles';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditorAddNewsDialogComponent } from '../editor-add-news-dialog/editor-add-news-dialog.component';
import { News } from 'src/app/models/news';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { NewsService } from 'src/app/services/news/news.service';
import { MatPaginator } from '@angular/material/paginator';
import { EditorEditNewsDialogComponent } from '../editor-show-news-dialog/editor-edit-news-dialog.component';


@Component({
  selector: 'app-editorpage',
  templateUrl: './editorpage.component.html',
  styleUrls: ['./editorpage.component.css']
})
export class EditorpageComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator

  news!: News | null

  user!: User | null
  role!: Roles | null
  userId!: string | undefined

  allNews$!: Observable<News[]>
  dataSource: MatTableDataSource<News> = new MatTableDataSource<News>()
  allNewsList: News[] = []
  allNewsCount!: number | null
  isNews: boolean = false


  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    private userService: UserService,
    private rolesService: RolesService,
    private newsService: NewsService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
  ) {
    this.authService.currentUser$.pipe(take(1)).subscribe((res) => {
      this.user = res
    })
    this.rolesService.currentRole$.pipe(take(1)).subscribe((res2) => {
      this.role = res2
    })
    this.countNews()
    // 
  }

  ngOnInit(): void {
  }

  countNews() {
    this.newsService.getAllEditorNews(this.user?.public_id!)
    .subscribe((res) => {
      this.allNewsCount = res.length
    })
  }

  showNews() {
    this.newsService.getAllEditorNews(this.user?.public_id!)
    .subscribe((res) => {
      this.allNewsList = res
      this.allNewsCount = res.length
      this.dataSource.data = this.allNewsList
      this.isNews = true
    })
    this.changeDetectorRef.detectChanges()
    this.dataSource.paginator = this.paginator
    this.allNews$ = this.dataSource.connect()
  }

  hideNews() {
    this.isNews = false
  }

  createNews(): void {

    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.minWidth = '500px'

    dialogConfig.data = {
      userId: this.user?.public_id,
    }

    const dialogRef = this.dialog.open(EditorAddNewsDialogComponent, 
      dialogConfig
    )

    dialogRef.afterClosed().subscribe(result => {
      if(this.isNews) this.showNews()
    })
  }

  editNews(editorNews: News) {
    console.log(editorNews.text)

    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.minWidth = '500px'

    dialogConfig.data = {
      userId: this.user?.public_id,
      news: editorNews,
    }

    const dialogRef = this.dialog.open(EditorEditNewsDialogComponent, 
      dialogConfig
    )

    dialogRef.afterClosed().subscribe(result => {
      if(this.isNews) this.showNews()
    })
  }

  deleteAccount() {

  }

  ngOnDestroy() {
      if (this.dataSource) {
        this.dataSource.disconnect()
      }
  }
}