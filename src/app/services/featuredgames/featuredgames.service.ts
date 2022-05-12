import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Featuredgames } from 'src/app/models/featuredgames';
import { Game } from 'src/app/models/game';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeaturedgamesService {

  private featuredgamesUrl = environment.apiUrl + '/featuredgames'
  private featuredgamesgamesUrl = environment.apiUrl + '/featuredgames/games'

  constructor(
    private httpClient: HttpClient,
  ) { }

  getFeaturedGames(): Observable<any> {
    return this.httpClient.get<Featuredgames>(this.featuredgamesUrl)
  }

  createFeaturedGames(): Observable<any> {
    return this.httpClient.post(this.featuredgamesUrl, {}).pipe(
      map((res: Featuredgames) => {
        const ftGames = res
        if (ftGames) return ftGames
        return ftGames
      })
    )
  }

  addGame(id: number): Observable<any> {
    return this.httpClient.put(this.featuredgamesgamesUrl + '/' + id, id)
  }

  removeGame(id: number): Observable<any> {
    return this.httpClient.delete(this.featuredgamesgamesUrl + '/' + id, {body: id})
  }

  deleteFeaturedGames(id: number): Observable<any> {
    return this.httpClient.delete(this.featuredgamesUrl + '/' + id, {body: id})
  }

  getFeaturedGamesList(): Observable<any> {
    return this.httpClient.get(this.featuredgamesgamesUrl)
  }
}
