import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from './modules/material.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { GamesComponent } from './pages/games/games.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { RankingsComponent } from './pages/rankings/rankings.component'
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';

import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AdminpageComponent } from './pages/adminpage/adminpage/adminpage.component';
import { EditorpageComponent } from './pages/editorpage/editorpage/editorpage.component';
import { EditorAddNewsDialogComponent } from './pages/editorpage/editor-add-news-dialog/editor-add-news-dialog.component';
import { EditorEditNewsDialogComponent } from './pages/editorpage/editor-show-news-dialog/editor-edit-news-dialog.component';
import { HomeShowNewsDialogComponent } from './pages/homepage/home-show-news-dialog/home-show-news-dialog.component';
import { GameShowTagsDialogComponent } from './pages/games/game-show-tags-dialog/game-show-tags-dialog.component';
import { GameComponent } from './pages/game/game/game.component';
import { WishlistpageComponent } from './pages/wishlistpage/wishlistpage/wishlistpage.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GamesComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    ReviewsComponent,
    RankingsComponent,
    ProfileComponent,
    EditProfileComponent,
    AdminpageComponent,
    EditorpageComponent,
    EditorAddNewsDialogComponent,
    EditorEditNewsDialogComponent,
    HomeShowNewsDialogComponent,
    GameShowTagsDialogComponent,
    GameComponent,
    WishlistpageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditorAddNewsDialogComponent, EditorEditNewsDialogComponent, GameShowTagsDialogComponent],
})
export class AppModule { }
