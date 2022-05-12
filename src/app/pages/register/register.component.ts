import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth/auth.service';
import { RolesService } from 'src/app/services/roles/roles.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup

  hide = true

  email = new FormControl('', [Validators.required, Validators.email])
  firstName = new FormControl('', [Validators.required])
  lastName = new FormControl('', [Validators.required])
  passwordHash = new FormControl('', [Validators.required])
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: this.email,
      passwordHash: this.passwordHash,
      firstName: this.firstName,
      lastName: this.lastName,

    })
  }

  submit(): void {
    console.log(this.form.value)
    this.authService.registerUser(this.form.value).subscribe((res) => {
      this.router.navigate(['login'])
    })
  }

}
