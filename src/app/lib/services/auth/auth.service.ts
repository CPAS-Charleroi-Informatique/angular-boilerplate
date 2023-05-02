/* eslint-disable no-var */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { storage } from '../../utils/storage/storage.utils';
import { BehaviorSubject, of } from 'rxjs';
import { HttpResult } from '../../interfaces/httpResult.interface';
import { Token } from '@angular/compiler';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //////////////////////////
  //Déclarations des variables
  //////////////////////////
  public isLoggedIn$        = new BehaviorSubject<boolean>(!!storage.getItem('App/session'));
  private readonly prefix   = 'auth/';
  private readonly AuthJSON = new HttpHeaders({ 'Content-Type': 'application/json' });


  //////////////////////////
  //Constructeur
  //////////////////////////
  constructor(private http : HttpClient) {
  }


  //////////////////////////
  //Getters et Setters
  //////////////////////////
  get isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  //////////////////////////
  //Méthodes
  //////////////////////////
  login(body:any){

    /**
     * TODO: Appeler l'API pour se connecter
     * Cette méthode doit retourner un Observable<HttpResult>
     * Pour le moment, on retourne un faux résultat
     */
    const FakeResponse : HttpResult = {
      "success": true,
      "status": 200,
      "messages": [],
      "data": {
        "accessToken": "header.payload.signature",
        "AccessTokenExpiration": 1682704745,
        "roles": [
          "admin"
        ]
      }
    }
    return of(FakeResponse);
  }

  /**
   * Cette méthode permet de stocker le token dans le local storage
   * et de mettre à jour le BehaviorSubject
   * @param response : Token
   */
  setUserToken(response:Token): void {
    storage.setItem('App/session', {token: JSON.stringify(response)});
    this.isLoggedIn$.next(true);
  }

  /**
   * Cette méthode permet de supprimer le token du local storage
   * et de mettre à jour le BehaviorSubject
  */
  logout(): void {
    storage.removeItem('App/session');
    this.isLoggedIn$.next(false);
  }

  /**
   * Cette méthode permet de récupérer les rôles stocké dans le localstorage de l'utilisateur connecté
   * @returns les rôles de l'utilisateur connecté
   */
  getUserRoles(): string[] {
    if(this.isLoggedIn){
      const token = JSON.parse(storage.getItem('App/session')?.token);
      return token.roles;
    }
    return [];
  }


  /**
   * Cette méthode permet de récupérer le token stocké dans le localstorage de l'utilisateur connecté
   * @returns le token de l'utilisateur connecté
   * @returns '' si l'utilisateur n'est pas connecté
   */
  getUserToken(): string {
    //Get the token from the local storage
    const tokenString = storage.getItem('App/session')?.token;
    if(tokenString)
      return JSON.parse(tokenString).accessToken;

    return '';
  }

  /**
   * Cette méthode retourne un boolean pour savoir si le token est expiré ou non
   * @returns true si le token est expiré
   * @returns false si le token n'est pas expiré
   */
  isTokenExpired(): boolean {
    const now = new Date();
    const expirationDate = this.getTokenExpirationDate(this.getUserToken());

    if (expirationDate === null)
      return true;

    return expirationDate < now;
  }

  /**
   * Cette méthode permet de savoir si l'utilisateur a les rôles nécessaires pour accéder à la page
   * @param requiredRoles : les rôles nécessaires pour accéder à la page
   * @returns boolean : true si l'utilisateur a les rôles nécessaires
   */
  hasRoles(requiredRoles: string[]): boolean {
    const userRoles = this.getUserRoles();
    return requiredRoles.some((role) => userRoles.includes(role));
  }


  /**
   * Cette méthode permet de récupérer la date d'expiration du token
   * @param token : le token sous forme de chaine de l'utilisateur connecté
   * @returns Date : la date d'expiration du token
   */
  private getTokenExpirationDate(token: string): Date | null {
    if (token === null || token === '')
      return null;

    const decoded = JSON.parse(atob(token.split('.')[1]));
    if (decoded.exp === undefined)
      return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
}
