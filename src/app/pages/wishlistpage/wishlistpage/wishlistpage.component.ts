import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Game } from 'src/app/models/game';
import { Tag } from 'src/app/models/tag';
import { User } from 'src/app/models/user';
import { Wishlist } from 'src/app/models/wishlist';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GamesService } from 'src/app/services/games/games.service';
import { RolesService } from 'src/app/services/roles/roles.service';
import { TagService } from 'src/app/services/tag/tag.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';

@Component({
  selector: 'app-wishlistpage',
  templateUrl: './wishlistpage.component.html',
  styleUrls: ['./wishlistpage.component.css']
})
export class WishlistpageComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator

  @ViewChild(MatSort)
  sort!: MatSort;

  wishlisted!: FormGroup
  id = new FormControl('')

  user!: User | null
  wishlist!: Wishlist | null
  tags!: Tag[] | null

  public dataSource = new MatTableDataSource<Game>()
  public displayedColumns = ['name', 'tags', 'steamReviewScore', 'reviewScore',
  'publisher', 'releasedOn', 'wishlisted'];

  constructor(
    private gamesService: GamesService,
    private authService: AuthService,
    private rolesService: RolesService,
    private wishlistService: WishlistService,
    private tagService: TagService,
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
  ) { 
    this.authService.currentUser$.pipe(take(1)).subscribe((res) => {
      this.user = res
    })
    this.checkAllGamesWishlist()
  }

  ngOnInit(): void {
    this.wishlisted = this.formBuilder.group( {
      id: this.id
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  checkAllGamesWishlist() {
    this.wishlistService.getWishlistUser(this.user?.public_id!)
    .subscribe((res) => {
      this.wishlist = res
      this.wishlistService.getGamesWishlist(this.user?.public_id!)
      .subscribe((res2) => {
      this.wishlist!.games = res2 as Game[]
      this.dataSource.data = res2 as Game[]
      this.user!.wishlist = this.wishlist!
      })
    })
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

  showTags(id: number) {
    
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
    console.log(newstr)
    console.log(rereleasedOnSplit)
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
    console.log(newString)
    newNumber = +newString
    console.log(newNumber)
    return newNumber
    
    } catch (error) {
      return 9999999
    }
    return 9999999
  }

}
