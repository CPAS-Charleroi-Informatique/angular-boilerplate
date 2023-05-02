import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _authService: AuthService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const isLoggedIn = this._authService.isLoggedIn;
    const requiredRoles = next.data?.['roles'];

    //Si endpoint nécéssite un role
    if (requiredRoles && isLoggedIn) {
      const userRoles = this._authService.getUserRoles();
      const hasRequiredRole = requiredRoles.some((role: string) => userRoles.includes(role));
      return hasRequiredRole;
      //Si endpoint nécéssite quel'utilisateur soit juste connecté
    } else if (isLoggedIn) {
      return true;
      //L'utilisateur n'est pas connecté ou n'a pas le bon role
    } else {
      this._router.navigate(['/auth/login']);
      return false;
    }
  }
}
