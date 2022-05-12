import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RolesService } from 'src/app/services/roles/roles.service';

@Injectable({
  providedIn: 'root'
})
export class EditorGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private rolesService: RolesService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | 
    UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.rolesService.currentRole$.pipe(
        map((role) => {
          console.log(role?.roleId)
          if (role?.roleId === 1) return true
          this.router.navigate(['homepage'])
          return false
        })
      )
    return true;
  }
  
}
