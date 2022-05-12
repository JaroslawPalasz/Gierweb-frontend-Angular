import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject } from 'rxjs';
import { Tag } from 'src/app/models/tag';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private tagUrl = environment.apiUrl + '/tag'
  private gameUrl = environment.apiUrl + '/game'

  constructor(
    private httpClient: HttpClient,
  ) { }

  private currentTagsSource = new ReplaySubject<Tag[] | null>(1)
  currentTags$ = this.currentTagsSource.asObservable()

  getTagsGame(id: number): Observable<any> {
    return this.httpClient.get<Tag[]>(this.tagUrl + '/game' + '/' + id)
  }

  setCurrentTags2(tags: Tag[]){
    this.currentTagsSource.next(tags)
  }

  setCurrentTags(id: number): Observable<any> {
    return this.getTagsGame(id).pipe(
      map((res: Tag[]) => {
        const tags = res
        if (tags) {
          console.log(tags)
          // delete role['userId']
          // localStorage.setItem('role', JSON.stringify(role))
          this.currentTagsSource.next(tags)
        }
        return tags
      })
    )
  }
}
