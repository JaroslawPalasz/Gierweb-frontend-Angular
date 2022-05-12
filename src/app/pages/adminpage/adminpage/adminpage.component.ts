import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Featuredgames } from 'src/app/models/featuredgames';
import { Game } from 'src/app/models/game';
import { Roles } from 'src/app/models/roles';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FeaturedgamesService } from 'src/app/services/featuredgames/featuredgames.service';
import { RolesService } from 'src/app/services/roles/roles.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator

  @ViewChild(MatSort)
  sort!: MatSort;

  isFeaturedGames!: boolean
  isFeaturedGamesShowed!: boolean
  ftGames!: Featuredgames | null
  games!: Game[] | null

  ftGamesLength!: number | null

  user!: User | null

  users!: User[] | null
  role!: Roles | null
  canDelete?: boolean = true


  public dataSource = new MatTableDataSource<User>()
  public displayedColumns = ['firstName', 'lastName', 'email', 'dateCreated',
  'delete'];

  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    public ftGamesService: FeaturedgamesService,
    private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService,
    private rolesService: RolesService,
    private router: Router,

  ) {
    this.authService.currentUser$.pipe(take(1)).subscribe((res) => {
      this.user = res
    })
    this.ftGamesService.getFeaturedGames()
    .subscribe((res) => {
      this.ftGames = res
      this.ftGamesService.getFeaturedGamesList()
      .subscribe((res2) => {
        this.games = res2 as Game[]
        this.ftGamesLength = this.games.length
      })
      this.isFeaturedGames = true
    })
    this.getAllUsers()
  }

  ngOnInit(): void {
    this.getAllUsers()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  hideFeaturedGames() {
    this.changeDetectorRef.detectChanges()
  }

  createFeaturedGames() {
    this.ftGamesService.createFeaturedGames()
    .subscribe((res) => {
      this.ftGames = res
      this.isFeaturedGames = true
    })
    this.changeDetectorRef.detectChanges()
  }

  deleteFeaturedGames() {
    this.ftGamesService.deleteFeaturedGames(this.ftGames?.id!)
    .subscribe((res) => {
      this.ftGames = null
      this.isFeaturedGames = false
      this.isFeaturedGamesShowed = false
    })
    this.changeDetectorRef.detectChanges()
  }

  getAllUsers() {
    this.userService.getAllUsers()
    .subscribe((res) => {
      this.dataSource.data = res as User[]
      this.users = res as User[]
    })
  }

  showUser(user: User) {

  }

  deleteUser(id: string) {
    console.log(id)
    this.userService.deleteUser(id)
    .subscribe((res) => {
      console.log('done')
    })
    this.getAllUsers()
    this.changeDetectorRef.detectChanges()
  }

  checkIfCanDelete(id: string) {
    let n = 0
    this.users?.forEach(element => {
      this.rolesService.getRole(id)
      .subscribe((res) => {
        this.role = res
      })
      if (this.role?.roleId === 0) {
        n = 1
      }
      if (this.role?.roleId === 1) {
        n = 1
      }
    });
    if (n === 1) return true
    return false
  }

}
