import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Game } from 'src/app/models/game';
import { Tag } from 'src/app/models/tag';
import { User } from 'src/app/models/user';
import { Wishlist } from 'src/app/models/wishlist';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GamesService } from 'src/app/services/games/games.service';
import { TagService } from 'src/app/services/tag/tag.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';

export interface imageLink {
  imageSmall?: string
  imageFull?: string
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  wishlisted!: FormGroup
  id = new FormControl('')
  
  game!: Game | null
  user!: User | null
  wishlist!: Wishlist | null
  // tag!: Tag | null
  tags!: Tag[] | null

  images!: imageLink[]

  steamReviewScore: boolean = true

  constructor(
    public authService: AuthService,
    private router: Router,
    private gamesService: GamesService,
    private tagService: TagService,
    private wishlistService: WishlistService,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
  ) {
    this.authService.currentUser$.pipe(take(1)).subscribe((res) => {
      this.user = res
    })
    this.gamesService.currentGame$.pipe(take(1)).subscribe((res2) => {
      this.game = res2
    })
    this.tagService.currentTags$.pipe(take(1)).subscribe((res3) => {
      this.tags = res3
    })
    if(this.game?.steamReviewScore === -1) this.steamReviewScore = false
    this.getImages()
    this.getTags()
  }

  ngOnInit(): void {
    if(this.user) {
      this.checkAllGamesWishlist()
      this.checkGameWishlist(this.game?.id!)
    }
    this.wishlisted = this.formBuilder.group( {
      id: this.id
    })
  }

  getImages() {
    var imagesSplit!: string[]
    var imagesSplit2!: string[]
    this.images = [] as imageLink[]

    imagesSplit = this.game?.imagesLink?.split(" ", 4)!
    // console.log(imagesSplit)
    imagesSplit.forEach(element => {
      var temp = {} as imageLink
      imagesSplit2 = element.split("+", 2)
      temp.imageSmall = imagesSplit2[0]
      console.log(temp.imageSmall)
      temp.imageFull = imagesSplit2[1]
      console.log(temp.imageFull)
      this.images.push(temp)
    });
    console.log(this.images)
  }

  getUrl() {
    let newString = "url('" + this.game?.backgroundImage + "')"
    // console.log(newString)
    return newString
    return "url('http://estringsoftware.com/wp-content/uploads/2017/07/estring-header-lowsat.jpg')";
  }

  getTags() {
    this.tagService.getTagsGame(this.game?.id!)
    .subscribe((res) => {
      this.tags = res
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
    })
    this.checkAllGamesWishlist()
    this.changeDetectorRef.detectChanges()
  }

  showScreenshots() {
    
  }

}
