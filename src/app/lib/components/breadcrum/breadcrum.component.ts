import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BreadcrumOptions } from '../../enums/breadcrum.enum';
import { Breadcrum } from '../../interfaces/breadcrum.interface';
import { BreadcrumService } from '../../services/breadcrum/breadcrum.service';

@Component({
  selector: 'app-breadcrum',
  templateUrl: './breadcrum.component.html',
  styleUrls: ['./breadcrum.component.scss'],
})
export class BreadcrumComponent implements OnInit, OnDestroy {
  routeThree: Breadcrum[] = [];
  strategy: string = BreadcrumOptions.automatic;

  private _destroy$ = new Subject();

  constructor(public router: Router, private _cdk: ChangeDetectorRef, private _breadcrumService: BreadcrumService) {

   }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      this.determineStrategy(event);
    });
  }

  ngOnDestroy(): void {
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }


  //#region service
  public updateBreadCrumbFromService(): any {
    this._breadcrumService.routes$.subscribe(r => this.routeThree = r);
    this._cdk.detectChanges();
  }
  //#endregion

  //#region url
  private createBreadCrumbFromUrl(event: any): any {
    this.routeThree = [];
    const routes = event.url.split('/');
    let endPoint = '';

    routes.forEach((element:string) => {
      if (element !== '' && element !== 'home') {
        endPoint += `/${element}`;
        const route: Breadcrum = { url: endPoint, label: element };
        this.routeThree.push({ url: endPoint, label: element });
      }
    });
    this._cdk.detectChanges();
  }
  //#endregion

  //#region Automatic
  private createBreadCrumbUrls(event: any): any {
    this.routeThree = [];
    const routesThree = this.router.config;
    const iterationNumber = event.url.split('/').length;
    const urls = [];
    const currentUrl = event.url;
    const routesIndex: number = this.defineRoutesIndex(routesThree, currentUrl);


    const routes = (routesThree[routesIndex] as any);

    if (!routes)
      return;

    //* La route n'a pas d'enfants
    if (!routes._loadedRoutes) {
      if(routes.path === '' || routes.path === 'home')
        this.routeThree.push({ label: "Acceuil", url: this.getUrlToNavigate("/" + routes.path) });
      else
        this.routeThree.push({ label: routes.path, url: this.getUrlToNavigate("/" + routes.path) });
    }

    //* La route a des enfants
    if (routes._loadedRoutes) {
      for (let index = 1; index < iterationNumber; index++) {
        const loadedRoutesNumber = routes._loadedRoutes.length;
        const currentUrlPart = currentUrl.split('/')[index];
        const loadedRoutes = routes._loadedRoutes;

        if(index === 1 && loadedRoutes.find((x:any) => x.path === '')){
          const breadcrumItem : Breadcrum = { label: currentUrlPart, url: currentUrlPart };
          this.routeThree.push(breadcrumItem)
        }

        if(loadedRoutes.find((x:any) => x.path === currentUrlPart)){
          const path = loadedRoutes.find((x:any) => x.path === currentUrlPart).path;
          const breadcrumItem : Breadcrum = { label: path, url: this.getUrlToNavigate("/" + path) };
          this.routeThree.push(breadcrumItem)
        }
      }
    }
    this._cdk.detectChanges();
  }

  private defineRoutesIndex(routes: any, currentUrl: string) {
    //* If the current route is the home page or the landing page
    if (currentUrl === '/' || currentUrl === '/home') {
      return 0;
    }

    //* If the first route can have a parameter (ex: /:username)
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].path.includes(':') && currentUrl.split('/').length === 2) {
        return 0;
      }
    }


    //* If the current route is not the home page or the landing page, it is a child route
    if (currentUrl.split.length > 1) {
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].path === currentUrl.split('/')[1]) {
          return i;
        }
      }
    }

    //* Route is not found
    return -1;
  }

  private getUrlToNavigate(url: string) {
    let urlToNavigate = '';

    if(this.routeThree.length === 0){
      return url;
    }

    for (let index = 0; index < this.routeThree.length; index++) {
      const route = this.routeThree[index];
      urlToNavigate += route.url;
    }
    urlToNavigate += url;

    return urlToNavigate;
  }
  //#endregion

  private determineStrategy(event:NavigationEnd): void {
    this.strategy = environment.breadcrum.strategy || BreadcrumOptions.automatic;

    switch (this.strategy) {
      case BreadcrumOptions.automatic:
        this.createBreadCrumbUrls(event);
        break;

      case BreadcrumOptions.service:
        this.updateBreadCrumbFromService();
        break;

      case BreadcrumOptions.url:
        this.createBreadCrumbFromUrl(event);
        break;
    }
  }
}
