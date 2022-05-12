import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game';
import { Wishlist } from 'src/app/models/wishlist';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlistUrl = environment.apiUrl + '/wishlist'
  private userUrl = environment.apiUrl + '/user'
  private wishlistUserUrl = environment.apiUrl + '/wishlist/user'

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
  ) { }

  getWishlistUser(public_id: string): Observable<any> {
    return this.httpClient.get<Wishlist>(this.wishlistUserUrl + '/' + public_id)
  }

  getGamesWishlist(public_id: string): Observable<any> {
    return this.httpClient.get<Game[]>(this.userUrl + '/' + 
    public_id + '/wishlist')
  }

  addToWishlist(public_id: string, id: number): Observable<any> {
    return this.httpClient.put(this.userUrl + '/' + 
    public_id + '/wishlist', id)
  }

  removeFromWishlist(public_id: string, id: number): Observable<any> {
    return this.httpClient.delete(this.userUrl + '/' + 
    public_id + '/wishlist', {body: id})
  }
}
