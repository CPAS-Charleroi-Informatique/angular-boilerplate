import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './lib/components/alert/alert.component';
import { BreadcrumComponent } from './lib/components/breadcrum/breadcrum.component';
import { FooterComponent } from './lib/components/footer/footer.component';
import { HamburgerButtonComponent } from './lib/components/hamburger-button/hamburger-button.component';
import { LayoutHorizontalComponent } from './lib/components/layouts/layout-horizontal/layout-horizontal.component';
import { LogoComponent } from './lib/components/logo/logo.component';
import { NavbarComponent } from './lib/components/navbar/navbar.component';
import { ShowHidePasswordButtonComponent } from './lib/components/show-hide-password-button/show-hide-password-button.component';
import { SkeletonLoaderComponent } from './lib/components/skeleton-loader/skeleton-loader.component';
import { AuthGuard } from './lib/guards/auth.guard';
import { NoAuthGuard } from './lib/guards/no-auth.guard';
import { JwtInterceptor } from './lib/interceptors/jwt.interceptor';
import { ServerErrorInterceptor } from './lib/interceptors/server-error.interceptor';
import { LoginPage } from './pages/auth/login/login.page';
import { RegisterPage } from './pages/auth/register/register.page';
import { HomePage } from './pages/home/home.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './lib/modules/material-module';
import { SortableIconDirective } from './lib/directives/sortable.directive';
import { ConfirmChallengeComponent } from './lib/components/confirm-challenge/confirm-challenge.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfilePage } from './pages/profile/profile.page';
import { AccessibilityPage } from './pages/settings/accessibility/accessibility.page';
import { AccountPage } from './pages/settings/account/account.page';
import { AppearancePage } from './pages/settings/appearance/appearance.page';
import { AdminPage } from './pages/settings/admin/admin.page';
import { HasRolesDirective } from './lib/directives/has-roles.directive';
import { TableComponent } from './lib/components/table/table.component';
import { ExportCsvButtonComponent } from './lib/components/export-csv-button/export-csv-button.component';
import { ButtonComponent } from './lib/components/button/button.component';
import { SlideOverComponent } from './lib/components/slide-over/slide-over.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LayoutHorizontalComponent,
    LogoComponent,
    HamburgerButtonComponent,
    BreadcrumComponent,
    SkeletonLoaderComponent,
    ShowHidePasswordButtonComponent,
    AlertComponent,
    RegisterPage,
    LoginPage,
    HomePage,
    SortableIconDirective,
    HasRolesDirective,
    ConfirmChallengeComponent,
    ProfilePage,
    AccessibilityPage,
    AccountPage,
    AppearancePage,
    AdminPage,
    TableComponent,
    ExportCsvButtonComponent,
    ButtonComponent,
    SlideOverComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    AuthGuard,
    NoAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
