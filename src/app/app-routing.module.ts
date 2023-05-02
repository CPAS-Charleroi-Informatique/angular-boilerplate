import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, } from './lib/guards/auth.guard';
import { LoginPage } from './pages/auth/login/login.page';
import { RegisterPage } from './pages/auth/register/register.page';
import { HomePage } from './pages/home/home.page';
import { ProfilePage } from './pages/profile/profile.page';
import { AccessibilityPage } from './pages/settings/accessibility/accessibility.page';
import { AccountPage } from './pages/settings/account/account.page';
import { AppearancePage } from './pages/settings/appearance/appearance.page';
import { AdminPage } from './pages/settings/admin/admin.page';
import { GettingStartedPage } from './pages/getting-started/getting-started.page';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth', children: [
      { path: 'login', component: LoginPage, title: "Login" },
      { path: 'register', component: RegisterPage },
    ]
  },
  {path: 'getting-started', component: GettingStartedPage, title: "Getting Started"},
  { path: 'home', component: HomePage, canActivate: [AuthGuard], title: "Acceuil" },
  { path: 'profile/:username', component: ProfilePage, canActivate: [AuthGuard], title: "Profil" },
  {
    path: 'settings', children: [
      { path: 'accessibility', component: AccessibilityPage, title: "Accessibility" },
      { path: 'account', component: AccountPage, title: "Account" },
      { path: 'appearance', component: AppearancePage, title: "Appearance" },
      { path: 'admin', component: AdminPage, canActivate: [AuthGuard], data: { roles: ['admin'] }, title: "Admin" },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
