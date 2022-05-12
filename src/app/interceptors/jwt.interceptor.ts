import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>, 
    next: HttpHandler
    ): Observable<HttpEvent<unknown>> {

      let currentUser: any
      this.authService.currentUser$.pipe(take(1))
      .subscribe((user) => (currentUser = user))

      if(currentUser) {
        request = request.clone({
          setHeaders: { 
            Authorization: `Bearer ${currentUser.token}`,
            // Authorization: `${currentUser.token}`,
          },
        })
      }
      
    return next.handle(request);
  }
}
