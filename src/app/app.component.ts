import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  user!: User

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
      this.authService.setCurrentUser(JSON.parse(localStorage.getItem('user')!))
  }
  title = 'gierweb-frontend';
}