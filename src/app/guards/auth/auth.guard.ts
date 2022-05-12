import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | 
    UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.currentUser$.pipe(
        map((user) => {
          if (user) return true
          this.router.navigate(['homepage'])
          return false
        })
      )
  }
}
