import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Breadcrum } from '../../interfaces/breadcrum.interface';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumService {
  private routes: BehaviorSubject<Breadcrum[]> = new BehaviorSubject<Breadcrum[]>([]);
  public routes$: Observable<Breadcrum[]> = this.routes.asObservable();
  constructor() {

  }

  setRoutes(array: Breadcrum[]): any {
    this.routes.next(array);
  }
}
