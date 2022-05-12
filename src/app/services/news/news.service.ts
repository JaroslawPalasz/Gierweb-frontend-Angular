import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';
import { News } from 'src/app/models/news';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private userUrl = environment.apiUrl + '/user'
  private newsUrl = environment.apiUrl + '/news'
  private userNewsUrl = environment.apiUrl + '/user/news'

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  getAllNews(): Observable<any> {
    return this.httpClient.get<News[]>(this.newsUrl)
  }

  getAllEditorNews(public_id: string): Observable<any> {
    return this.httpClient.get<News[]>(this.userUrl + '/' + 
    public_id + '/news')
  }

  createNews(form: FormBuilder): Observable<any> {
    return this.httpClient.post(this.userNewsUrl, form).pipe(
      map((res: News) => {
        const news = res
        if (news) return news
        return news
      })
    )
  }
    

  editNews(id: string, form: FormBuilder): Observable<any> {
    return this.httpClient.put(this.newsUrl + '/' + id, form)
    .pipe(
      map((res: News) => {
        const news = res
        if (news) return news
        return news
      })
    )

  }

  deleteNews(id: number): Observable<any> {
    return this.httpClient.delete(this.newsUrl + '/' + id)
    .pipe(
      map((res: News) => {
        const news = res
        if (news) return news
        return news
      })
    )
  }
}
