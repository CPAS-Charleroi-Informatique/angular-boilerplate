import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HasRolesDirective } from '../../directives/has-roles.directive';
import { UserRole } from '../../enums/user-role.enum';
import { Subject, takeUntil } from 'rxjs';
import { BreadcrumComponent } from '../breadcrum/breadcrum.component';
import { HamburgerButtonComponent } from '../hamburger-button/hamburger-button.component';
import { LogoComponent } from '../logo/logo.component';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { HttpResult } from '../../interfaces/httpResult.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements  OnDestroy{
  isBreadcrumVisible: boolean = environment.breadcrum.enabled;
  adminRoles = UserRole.Administrateur;
  _destroy$ = new Subject();

  constructor(private _router: Router, private _authService: AuthService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if(event.target.innerWidth > 640){
      // removeHeaderStyle();
    }
  }

  ngOnDestroy(): void {
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  onClickSignOut(): void {
    this._authService.logout();
    this._router.navigateByUrl('/auth/login');
  }

  onClickHamburgerButton(status:any){
    // annimateHeader(status);
  }
}
