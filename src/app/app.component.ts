import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutHorizontalComponent } from './lib/components/layouts/layout-horizontal/layout-horizontal.component';
import { AuthService } from './lib/services/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn$!: Observable<boolean>;

  constructor(private _authService: AuthService, private router : Router) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this._authService.isLoggedIn$;

    //? is token expired?
    if(this._authService.isTokenExpired()){
      this._authService.logout();
      this.router.navigate(['/']);
    }
  }
}
