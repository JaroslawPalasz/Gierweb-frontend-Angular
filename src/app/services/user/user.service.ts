import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = environment.apiUrl + '/user'
  private userCurrentUrl = environment.apiUrl + '/user/current'

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) { }

  private currentUserSource = new ReplaySubject<User | null>(1)
  currentUser$ = this.currentUserSource.asObservable()

  getUser(publicId: number): Observable<any> {
    return this.httpClient.get<User>(this.userUrl + '/unsf' + '/' + publicId)
  }

  getAllUsers(): Observable<any> {
    return this.httpClient.get<User>(this.userUrl)
  }

  deleteUser(public_id: string): Observable<any> {
    return this.httpClient.delete(this.userUrl + '/' + public_id, {body: public_id})
  }

  getCurrentUser(): Observable<any> {
    let currentUser: any
    this.authService.currentUser$.pipe(take(1))
    .subscribe((user) => (currentUser = user))
      

    return this.httpClient.get<User>(
      this.userCurrentUrl)

  }

}
