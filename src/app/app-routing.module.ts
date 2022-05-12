import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterComponent } from './pages/register/register.component';
import { GamesComponent } from './pages/games/games.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { RankingsComponent } from './pages/rankings/rankings.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { EditorpageComponent } from './pages/editorpage/editorpage/editorpage.component';
import { AdminpageComponent } from './pages/adminpage/adminpage/adminpage.component';

import { AuthGuard } from './guards/auth/auth.guard';
import { EditorGuard } from './guards/editor/editor.guard';
import { AdminnGuard } from './guards/adminn/adminn.guard';
import { LoggedGuard } from './guards/logged/logged.guard';
import { GameComponent } from './pages/game/game/game.component';
import { WishlistpageComponent } from './pages/wishlistpage/wishlistpage/wishlistpage.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full'},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    // canActivate: [LoggedInGuard],
    children: [
      { path: 'homepage', component: HomepageComponent},
      { 
        path: 'login', 
        component: LoginComponent,
        canActivate: [LoggedGuard],
      },
      { 
        path: 'register', 
        component: RegisterComponent,
        canActivate: [LoggedGuard],
      },
      { path: 'gamepage', component: GameComponent},
      { path: 'games', component: GamesComponent},
      { path: 'reviews', component: ReviewsComponent},
      { path: 'rankings', component: RankingsComponent},
      { 
        path: 'profile', 
        component: ProfileComponent, 
        canActivate: [AuthGuard], 
      },
      { 
        path: 'edit-profile', 
        component: EditProfileComponent,
        canActivate: [AuthGuard],
      },
      { 
        path: 'wishlist-page', 
        component: WishlistpageComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { 
        path: 'editor-page', 
        component: EditorpageComponent, 
        canActivate: [EditorGuard], 
      },
      { 
        path: 'admin-page', 
        component: AdminpageComponent,
        canActivate: [AdminnGuard],
      },
    ]
  },
  // {

  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
