import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { GlobalFilterPipe } from 'src/app/lib/pipes/global-filter.pipe';
import { downloadFile, objectToCSV } from '../../utils/helpers/helpers.utils';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractListPageService {
  public p: number;
  public itemsPerPage: number;
  public requestEmmited: boolean;
  public filteredData: any;

  private filter: string = '';
  private _data: any;

  get data(): any {
    return this._data || [] ;
  }
  set data(value: any) {
    this._data = value;
    this.filteredData = value;
  }

  constructor() {
    this.p = 1;
    this.itemsPerPage = 10;
    this.requestEmmited = false;
  }

  /*
  * Fonction permettant de filtrer les données
  * @param event : Event de changement de valeur dans l'input
  */
  onChangeFiltre(event: any) {
    this.filter = event.target.value;
    if (this.filter === '') this.filteredData = this.data;
    else this.filteredData = GlobalFilterPipe.prototype.transform(this.data, this.filter);
  }


  /*
  * Fonction permettant de changer le nombre d'éléments par page
  * @param event : Event de changement de valeur dans le select
  */
  onChangeItemPerPage(event:any){
    this.itemsPerPage = event.target.value;
  }

/*
* Fonction permettant de télécharger le fichier csv
*/
  onClickDownload(fileName: string) {
    const data = objectToCSV(this._data);
    downloadFile(data, fileName);
  }

  /*
  * Fonction permettant de trier les données
  */
  sortData(sort: Sort) {
    let data;
    if (this.filter !== '') data = GlobalFilterPipe.prototype.transform(this.data, this.filter);
    else data = this.data.slice();

    if (!sort.active || sort.direction === '') {
      this.filteredData = data;
      return;
    }

    this.filteredData = data.sort((a:any, b:any) => {
      const isAsc = sort.direction === 'asc';
      //is a dd/mm/yyyy date ?
      if ((a != null || a != undefined || b != null || b != undefined) &&  (typeof a[sort.active] == 'string' && typeof b[sort.active]  == 'string')) {
        if(a[sort.active].match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/)){
          const dateA = new Date(a[sort.active].split('/').reverse().join('-'));
          const dateB = new Date(b[sort.active].split('/').reverse().join('-'));
          return this.compare(dateA, dateB, isAsc);
        }
      }

      return this.compare(a[sort.active], b[sort.active], isAsc);
    });
  }

  /*
  * Fonction permettant de comparer deux éléments
  */
  private compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    //is a date ?
    if (a instanceof Date && b instanceof Date) {
      return (a.getTime() < b.getTime() ? -1 : 1) * (isAsc ? 1 : -1);
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
