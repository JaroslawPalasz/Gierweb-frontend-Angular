import { ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Featuredgames } from 'src/app/models/featuredgames';
import { Game } from 'src/app/models/game';
import { News } from 'src/app/models/news';
import { Tag } from 'src/app/models/tag';
import { User } from 'src/app/models/user';
import { Wishlist } from 'src/app/models/wishlist';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FeaturedgamesService } from 'src/app/services/featuredgames/featuredgames.service';
import { GamesService } from 'src/app/services/games/games.service';
import { NewsService } from 'src/app/services/news/news.service';
import { TagService } from 'src/app/services/tag/tag.service';
import { UserService } from 'src/app/services/user/user.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import { HomeShowNewsDialogComponent } from './home-show-news-dialog/home-show-news-dialog.component';

export interface Tile {
  id: number
  color: string
  cols: number
  rows: number
  border: string
  text: string
  imageLink: string
  posted: Date

  userIdunsf: string
  userId: number

  userName?: string | null
  userSurname?: string | null
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  news!: News | null
  allNews$!: Observable<News[]>
  dataSource: MatTableDataSource<News> = new MatTableDataSource<News>()
  allNewsList: News[] = []
  allNewsCount!: number | null
  isNews: boolean = false

  allTiles$!: Observable<Tile[]>
  dataSourceTile: MatTableDataSource<Tile> = new MatTableDataSource<Tile>()
  allTilesList: Tile[] = []


  ftGames!: Featuredgames | null
  allFtGames$!: Observable<Game[]>
  dataSourceFtGames: MatTableDataSource<Game> = new MatTableDataSource<Game>()
  allFtGamesList: Game[] = []
  allFtGamesCount!: number | null
  isFtGames: boolean = false
  tags!: Tag[] | null

  user!: User | null
  wishlist!: Wishlist | null

  constructor(
    public dialog: MatDialog,
    private newsService: NewsService,
    private changeDetectorRef: ChangeDetectorRef,
    private ftGamesService: FeaturedgamesService,
    private wishlistService: WishlistService,
    private gamesService: GamesService,
    private tagService: TagService,
    private userService: UserService,
    private authService: AuthService,
    // private changeDetectorRef2: ChangeDetectorRef,
    private router: Router,
  ) {
    this.authService.currentUser$.pipe(take(1)).subscribe((res) => {
      this.user = res
    })
    this.countNews()
    this.getAllGamesWishlist()
  }

  ngOnInit(): void {
    this.showNews()
    this.showFtGames()
  }

  getAllGamesWishlist() {
    this.wishlistService.getWishlistUser(this.user?.public_id!)
    .subscribe((res) => {
      this.wishlist = res
      this.wishlistService.getGamesWishlist(this.user?.public_id!)
      .subscribe((res2) => {
      this.wishlist!.games = res2 as Game[]
      this.user!.wishlist = this.wishlist!
      })
    })
  }

  checkGameWishlist(gameId: number): boolean {
    let n = 0
    this.user?.wishlist?.games?.forEach(element => {
      if (gameId === element.id) {
        n = 1
      }
    });
    if (n === 1) return true
    return false
  }

  countNews() {
    this.newsService.getAllNews()
    .subscribe((res) => {
      this.allNewsCount = res.length
    })
  }

  showFtGames() {
    this.ftGamesService.getFeaturedGamesList()
    .subscribe((res) => {
      this.allFtGamesList = res
      this.dataSourceFtGames.data = this.allFtGamesList
      this.isFtGames = true

      this.changeDetectorRef.detectChanges()
      this.dataSourceFtGames.paginator = this.paginator.toArray()[1]

      this.allFtGames$ = this.dataSourceFtGames.connect()
    })
  }

  showNews() {
    this.newsService.getAllNews()
    .subscribe((res) => {
      this.allTilesList = res
      var counter: number
      var counter2: number
      counter = 0
      counter2 = 1
      for (var index = 0; index < this.allTilesList.length; index++) {
        let idd = this.allTilesList[index].userId
        let firstName = ""
        let lastName = ""
        this.userService.getUser(idd)
        .subscribe((res) => {
          firstName = res.firstName
          lastName = res.lastName
        })
        this.allTilesList[index].userName = firstName
        this.allTilesList[index].userSurname = lastName
        this.allTilesList[index].border = '3px double black'
        this.allTilesList[index].color = 'darkblue'
        if (index == 0) {
          this.allTilesList[index].id = 1
          this.allTilesList[index].cols = 3
          this.allTilesList[index].rows = 1
          this.allTilesList[index].color = 'darkblue'
        }
        if (index % 4 == 0) {
          this.allTilesList[index].id = 4
          this.allTilesList[index].cols = 2
          this.allTilesList[index].rows = 1
          this.allTilesList[index].color = 'darkgreen'
        }
        else if (index % 2 == 0) {
          this.allTilesList[index].id = 2
          this.allTilesList[index].cols = 1
          this.allTilesList[index].rows = 2
          this.allTilesList[index].color = 'darkpink'
        }
        else if (index % 3 == 0) {
          this.allTilesList[index].id = 3
          this.allTilesList[index].cols = 1
          this.allTilesList[index].rows = 1
          this.allTilesList[index].color = 'darkred'
        }
        else {
          this.allTilesList[index].id = 1
          this.allTilesList[index].cols = 3
          this.allTilesList[index].rows = 1
          this.allTilesList[index].color = 'darkblue'
        }
      }
      this.dataSourceTile.data = this.allTilesList
      this.isNews = true
    })
    this.changeDetectorRef.detectChanges()
    this.dataSourceTile.paginator = this.paginator.toArray()[0]
    this.allTiles$ = this.dataSourceTile.connect()
  }

  hideNews() {
    this.isNews = false
  }

  showSingleNews(singleNews: News) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.minWidth = '500px'

    dialogConfig.data = {
      news: singleNews,
    }

    const dialogRef = this.dialog.open(HomeShowNewsDialogComponent, 
      dialogConfig
    )

    dialogRef.afterClosed().subscribe(result => {
      if(this.isNews) this.showNews()
      this.countNews()
    })
  }

  showSingleFtGame(singleFtGame: Game) {
    this.gamesService.setCurrentGame(singleFtGame)
    this.tagService.setCurrentTags(singleFtGame.id!).subscribe((res) => {
      this.tags = res
    })
    this.tagService.setCurrentTags2(this.tags!)
    this.router.navigate(['gamepage'])
    console.log(singleFtGame)
  }

  hmm(tile: Tile) {
    console.log(tile.text)
    console.log(tile.posted)
    console.log('id: ' + tile.id)
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect()
    }
    if (this.dataSourceTile) {
      this.dataSourceTile.disconnect()
    }
    if(this.dataSourceFtGames) {
      this.dataSourceFtGames.disconnect()
    }
  }
}
