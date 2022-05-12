import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: User | null

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) { 
    this.authService.currentUser$.pipe(take(1)).subscribe((res) => {
      this.user = res
    })
  }

  ngOnInit(): void {
  }

  editAccount() {
    this.router.navigate(['edit-profile'])
  }

  deleteAccount() {

  }

}
