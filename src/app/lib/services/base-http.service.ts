import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseHttpService {
  protected abstract readonly prefix: string;
  protected readonly AuthJSON = new HttpHeaders({ 'Content-Type': 'application/json' });
  protected http: HttpClient;

  constructor() {
    this.http = inject(HttpClient);
  }
}
