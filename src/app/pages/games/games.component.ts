import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Game } from 'src/app/models/game';
import { User } from 'src/app/models/user';
import { GamesService } from 'src/app/services/games/games.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { take, timestamp } from 'rxjs/operators';
import { RolesService } from 'src/app/services/roles/roles.service';
import { Roles } from 'src/app/models/roles';
import { Observable } from 'rxjs';
import { Wishlist } from 'src/app/models/wishlist';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Tag } from 'src/app/models/tag';
import { TagService } from 'src/app/services/tag/tag.service';
import { GameShowTagsDialogComponent } from './game-show-tags-dialog/game-show-tags-dialog.component';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { FeaturedgamesService } from 'src/app/services/featuredgames/featuredgames.service';
import { Featuredgames } from 'src/app/models/featuredgames';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator

  @ViewChild(MatSort)
  sort!: MatSort;

  wishlisted!: FormGroup
  id = new FormControl('')

  featured!: FormGroup
  idFt = new FormControl('')
  

  ftGames!: Game[] | null
  user!: User | null
  wishlist!: Wishlist | null
  role!: Roles | null

  isOnWishlist: boolean = true

  tags!: Tag[] | null


  public dataSource = new MatTableDataSource<Game>()
  public displayedColumns = ['name', 'tags', 'steamReviewScore', 'reviewScore',
  'publisher', 'releasedOn', 'wishlisted', 'isFeatured'];
  // public dataSource: MatTableDataSource<Game> = new MatTableDataSource<Game>()
  

  constructor(
    private gamesService: GamesService,
    private authService: AuthService,
    private rolesService: RolesService,
    private wishlistService: WishlistService,
    private tagService: TagService,
    private ftGamesService: FeaturedgamesService,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.authService.currentUser$.pipe(take(1)).subscribe((res) => {
      this.user = res
    })
    this.rolesService.currentRole$.pipe(take(1)).subscribe((res) => {
      this.role = res
    })
    this.checkAllGamesFeatured()
    if (!this.user) this.displayedColumns = ['name', 'tags', 
    'steamReviewScore', 'reviewScore', 'publisher', 'releasedOn', 'isFeatured'];
    else {
      this.checkAllGamesWishlist()
      if (this.role?.roleId == 2) this.displayedColumns = ['name', 'tags', 
      'steamReviewScore', 'reviewScore', 'publisher', 'releasedOn', 
      'wishlisted', 'isFeatured', 'delete'];
    }
    
  }

  ngOnInit(): void {
    this.getAllGames()
    this.wishlisted = this.formBuilder.group( {
      id: this.id
    })
    this.featured = this.formBuilder.group( {
      id: this.idFt
    })
  }
  
  sortingDataAccessor = (item: any, property: any) => {
    var rereleasedOn = " "
    switch (property) {
      case 'releasedOn': {
        if (item.releasedOn === "Coming Soon") {
          return 9999999
        }
        else {
          rereleasedOn = item.releasedOn
          return this.sortingDates(rereleasedOn)
        }
        // Jan 8, 2021
        // return item.releasedOn;
      }
      case 'wishlisted': {
        if(this.checkGameWishlist(item.id)) return true
        // console.log(item.id)
        return false;
      }
      default: return item[property];
    }
  };

  sortingDates(releasedOn: string): number {
    var rereleasedOnSplit!: string[]
    var newstr!: string
    var newString!: string
    var newNumber!: number
    newstr = releasedOn.replace(',', ' ')
    rereleasedOnSplit = releasedOn.split(" ", 3)
    try {
      rereleasedOnSplit[1].replace('Jan', '01')
    rereleasedOnSplit[1].replace('Feb', '02')
    rereleasedOnSplit[1].replace('Mar', '03')
    rereleasedOnSplit[1].replace('Apr', '04')
    rereleasedOnSplit[1].replace('May', '05')
    rereleasedOnSplit[1].replace('Jun', '06')
    rereleasedOnSplit[1].replace('Jul', '07')
    rereleasedOnSplit[1].replace('Aug', '08')
    rereleasedOnSplit[1].replace('Sep', '09')
    rereleasedOnSplit[1].replace('Oct', '10')
    rereleasedOnSplit[1].replace('Nov', '11')
    rereleasedOnSplit[1].replace('Dec', '12')

    rereleasedOnSplit[0].replace('1', '01')
    rereleasedOnSplit[0].replace('2', '02')
    rereleasedOnSplit[0].replace('3', '03')
    rereleasedOnSplit[0].replace('4', '04')
    rereleasedOnSplit[0].replace('5', '05')
    rereleasedOnSplit[0].replace('6', '06')
    rereleasedOnSplit[0].replace('7', '07')
    rereleasedOnSplit[0].replace('8', '08')
    rereleasedOnSplit[0].replace('9', '09')

    newString = rereleasedOnSplit[2] + rereleasedOnSplit[1] + rereleasedOnSplit[0]
    // console.log(newString)
    newNumber = +newString
    // console.log(newNumber)
    return newNumber
    
    } catch (error) {
      return 9999999
    }
    return 9999999
  }

  showGame(game: Game) {
    this.gamesService.setCurrentGame(game)
    this.tagService.setCurrentTags(game.id!).subscribe((res) => {
      this.tags = res
      // this.router.navigate(['homepage'])
    })
    this.tagService.setCurrentTags2(this.tags!)
    this.router.navigate(['gamepage'])
    console.log(game)
  }

  removeFromWishlist(id: number) {
    this.wishlisted = this.formBuilder.group({
      id: id
    })
    console.log(this.wishlisted.value)
    this.wishlistService.removeFromWishlist(this.user?.public_id!, 
      this.wishlisted.value)
          .subscribe((res) => {
            this.wishlisted.reset()
            console.log('dd')
    })
    this.checkAllGamesWishlist()
    this.changeDetectorRef.detectChanges()
  }

  addToWishlist(id: number) {
    this.wishlisted = this.formBuilder.group({
      id: id
    })
    console.log(this.wishlisted.value)
    this.wishlistService.addToWishlist(this.user?.public_id!, 
      this.wishlisted.value)
          .subscribe((res) => {
            this.wishlisted.reset()
            console.log('dd')
    })
    this.checkAllGamesWishlist()
    this.changeDetectorRef.detectChanges()
  }
    

  showTags(id: number) {
    this.tagService.setCurrentTags(id).subscribe((res) => {
      this.tags = res
      // this.router.navigate(['homepage'])
    })
    this.tagService.currentTags$.pipe(take(1)).subscribe((res) => {
      this.tags = res
    })
    // this.tagService.getTagsGame(id)
    // .subscribe((res) => {
    //   this.tags = res as Tag[]
    // })
    console.log(this.tags)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.minWidth = '600px'
    
    dialogConfig.data = {
      tags: this.tags,
    }

    const dialogRef = this.dialog.open(GameShowTagsDialogComponent, 
      dialogConfig
    )

    dialogRef.afterClosed().subscribe(result => {
      
    })
  }

  checkAllGamesWishlist() {
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

  checkAllGamesFeatured() {
    this.ftGamesService.getFeaturedGamesList()
    .subscribe((res) => {
      this.ftGames = res as Game[]
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

  

  deleteGame(id: number) {

  }

  ngAfterViewInit(): void {
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  checkGameFt(id: number) {
    let n = 0
    this.ftGames?.forEach(element => {
      if (id === element.id) {
        n = 1
      }
    });
    if (n === 1) return true
    return false
  }

  removeFromFtGames(id: number) {
    if (this.role?.roleId === 1) {
      this.featured = this.formBuilder.group({
        id: id
      })
      console.log(this.featured.value)
      this.ftGamesService.removeGame(this.featured.value)
            .subscribe((res) => {
              this.featured.reset()
      })
    }
    this.checkAllGamesFeatured()
    this.changeDetectorRef.detectChanges()
  }

  addToFtGames(id: number) {
    if (this.role?.roleId === 1) {
      this.featured = this.formBuilder.group({
        id: id
      })
      console.log(this.featured.value)
      this.ftGamesService.addGame(this.featured.value)
            .subscribe((res) => {
              this.featured.reset()
      })
    }
    this.checkAllGamesFeatured()
    this.changeDetectorRef.detectChanges()
  }


  getAllGames() {
    this.gamesService.getAllGames()
    .subscribe((res) => {
      this.dataSource.data = res as Game[]
    })
  }

}