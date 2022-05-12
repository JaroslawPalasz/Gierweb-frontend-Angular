import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth/auth.service';
import { RolesService } from 'src/app/services/roles/roles.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup

  hide = true

  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.required])

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private rolesService: RolesService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      // default: this.email
      email: this.email,
      password: this.password,
    })
  }

  submit(): void {
    console.log(this.form.value)
    this.authService.loginUser(this.form.value).subscribe((res) => {
      this.rolesService.setCurrentUserRole().subscribe(() => {
        this.router.navigate(['homepage'])
      })
    })
  }

}
