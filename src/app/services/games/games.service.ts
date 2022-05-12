import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject } from 'rxjs';
import { Game } from 'src/app/models/game';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  // TODO: add games to wishlist etc
  private gamesUrl = environment.apiUrl + '/game'

  constructor(
    private httpClient: HttpClient,
  ) { }

  private currentGameSource = new ReplaySubject<Game | null>(1)
  currentGame$ = this.currentGameSource.asObservable()

  setCurrentGame(game: Game) {
    this.currentGameSource.next(game)
  }

  getAllGames(): Observable<any> {
    return this.httpClient.get<Game[]>(this.gamesUrl)
  }

  getGameById(id: number): Observable<any> {
    return this.httpClient.get<Game>(this.gamesUrl)
  }

  deleteGame(): Observable<any> {
    return this.httpClient.get<Game[]>(this.gamesUrl)
  }
}
