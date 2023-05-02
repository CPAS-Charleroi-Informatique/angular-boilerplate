import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private _router: Router, private _authService: AuthService) {}

  canActivate(): boolean {
    const isLoggedIn = this._authService.isLoggedIn;
    if (isLoggedIn) {
      this._router.navigateByUrl('/');
      return false;
    }

    return true;
  }
}
