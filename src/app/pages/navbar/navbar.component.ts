import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from '@angular/router'
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Roles } from 'src/app/models/roles';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RolesService } from 'src/app/services/roles/roles.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user!: User | null
  role!: Roles 
  isEditor: boolean = false
  isAdmin: boolean = false

  roleSource$!: Observable<Roles>
  allRoles: Roles = {}


  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
    public authService: AuthService,
    private rolesService: RolesService,
    private changeDetectorRef: ChangeDetectorRef,
    ) {
      this.matIconRegistry.addSvgIcon(
      "logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/logoooo-cropped.svg")
    );
    this.authService.currentUser$.pipe(take(1)).subscribe((res) => {
      this.user = res
    })
    this.rolesService.currentRole$.pipe(take(1)).subscribe((res) => {
      this.role = res!
      this.allRoles = res!
      if (this.role?.roleId === 1) this.isEditor = true
      else if (this.role?.roleId === 2) this.isAdmin = true
    })
  }

  ngOnInit(): void {
    
  }

  gameSearchValue = ''
  // TODO: remove and add user check

  login() {
    // this.authService.
    this.router.navigate(['login'])
  }

  Register() {
    this.router.navigate(['register'])
  }

  Games() {
    this.router.navigate(['games'])
  }

  Reviews() {
    this.router.navigate(['reviews'])
  }

  Rankings() {
    this.router.navigate(['rankings'])
  }

  editAccount() {
    this.router.navigate(['profile'])
  }

  wishlistPage() {
    this.router.navigate(['wishlist-page'])
  }

  editorPanel() {
    this.router.navigate(['editor-page'])
  }

  adminPanel() {
    this.router.navigate(['admin-page'])
  }

  logout() {
    this.isEditor = false
    this.isAdmin = false
    this.changeDetectorRef.detectChanges()
    this.authService.logoutUser()
    this.rolesService.logoutUser()
    this.changeDetectorRef.detectChanges()
    this.router.navigate(['homepage'])
  }

}
