import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';
import { HttpResult } from 'src/app/lib/interfaces/httpResult.interface';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { getErrors } from 'src/app/lib/utils/helpers/helpers.utils';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  errors: string;
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });


  constructor(private _router: Router, private _authService: AuthService,) {
    this.errors = '';
    this.initForm();
    this.redirectLoggedUsers();
  }


  /*
  * Méthode appelée lors du clic sur le bouton "Se connecter"
  * Récupère les données du formulaire et les envoie au service d'authentification
  * Si la réponse est positive, on stocke le token dans le local storage et on redirige vers la page d'accueil
  * Sinon, on affiche les erreurs
  */
  onClickSignIn(): void {
    this._authService.login(this.form.value).pipe(
      tap((response: HttpResult) => {
        this._authService.setUserToken(response.data);
        this._router.navigateByUrl("/");
      }),
      catchError((error: any) => {
        this.errors = getErrors(error);
        return of(null);
      })
    ).subscribe();
  }

  /**
   * Initialise le formulaire
   */
  private initForm(): void {
    this.form.setValue({
      username: '',
      password: '',
    });
  }


  /**
   * Redirige les utilisateurs connectés vers la page d'accueil
   */
  private redirectLoggedUsers(): void {
    if (this._authService.isLoggedIn)
      this._router.navigateByUrl("/");
  }
}
