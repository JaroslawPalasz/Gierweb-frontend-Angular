import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userUrl = environment.apiUrl + '/user'
  private registerUrl = environment.apiUrl + '/register'
  private loginUrl = environment.apiUrl + '/login'

  constructor(private http: HttpClient) { }

  private currentUserSource = new ReplaySubject<User | null>(1)
  currentUser$ = this.currentUserSource.asObservable()

  loginUser(form: FormBuilder): Observable<any> {
    return this.http.post(this.loginUrl, form).pipe(
      map((res: User) => {
        const user = res
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user)
        }
        return user
      })
    )
  }

  registerUser(form: FormBuilder): Observable<any> {
    return this.http.post(this.registerUrl, form).pipe(
      map((res: User) => {
        const user = res
        if (user) {
          return user
          // localStorage.setItem('user', JSON.stringify(user))
          // this.currentUserSource.next(user)
        }
        return user
      })
    )
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user)
  }
  logoutUser() {
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    this.currentUserSource.next(null)
  }

}
