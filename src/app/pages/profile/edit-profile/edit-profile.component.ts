import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user!: User | null
  form: FormGroup = new FormGroup({})
  email!: FormControl
  firstName!: FormControl
  lastName!: FormControl
  oldPassword!: FormControl
  newPassword!: FormControl
  hide = true
  hide2 = true

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) {
    this.authService.currentUser$.pipe(take(1)).subscribe((res) => {
      this.user = res
    })
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: (this.email = new FormControl(this.user?.email, [
        Validators.required,
      ])),
      firstName: (this.firstName = new FormControl(this.user?.firstName, [
        Validators.required,
      ])),
      lastName: (this.lastName = new FormControl(this.user?.lastName, [
        Validators.required,
      ])),
      oldPassword: (this.oldPassword = new FormControl('', [
        Validators.required,
      ])),
      newPassword: (this.newPassword = new FormControl('', [
        Validators.required,
      ])),
    })
  }

  getEmail() {

  }

  generatePassword() {

  }

  getPassword() {

  }

  getCurrentUser() {
    // console.log(localStorage.getItem('user'))
    this.userService.getCurrentUser().subscribe((data: User) => this.user = { ...data})
  }

  submit() {

  }

}
