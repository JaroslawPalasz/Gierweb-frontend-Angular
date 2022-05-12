import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RolesService } from 'src/app/services/roles/roles.service';

@Injectable({
  providedIn: 'root'
})
export class AdminnGuard implements CanActivate {

  constructor(
    private rolesService: RolesService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | 
    UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.rolesService.currentRole$.pipe(
        map((role) => {
          if (role?.roleId === 2) return true
          return false
        })
      )
    return true;
  }
}
