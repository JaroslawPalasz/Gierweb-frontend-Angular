import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';
import { Roles } from 'src/app/models/roles';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private rolesUrl = environment.apiUrl + '/roles'
  private rolesUserUrl = environment.apiUrl + '/roles/user'

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) { }

  private currentRoleSource = new ReplaySubject<Roles | null>(1)
  currentRole$ = this.currentRoleSource.asObservable()

  user?: User | null

  getRole(public_id: string): Observable<any> {
    return this.httpClient.get<Roles>(this.rolesUserUrl + '/' + public_id)
  }

  getCurrentUserRole(): Observable<any> {
    this.authService.currentUser$.pipe(take(1)).subscribe((resAuth) => {
      this.user = resAuth
    })
    return this.httpClient.get<Roles>(
      this.rolesUserUrl + '/' + this.user?.public_id)
  }

  setCurrentUserRole(): Observable<any> {
    return this.getCurrentUserRole().pipe(
      map((res: Roles) => {
        const role = res
        if (role) {
          console.log(role)
          localStorage.setItem('role', JSON.stringify(role))
          this.currentRoleSource.next(role)
        }
        return role
      })
    )
  }

  logoutUser() {
    this.currentRoleSource.next(null)
  }

}
