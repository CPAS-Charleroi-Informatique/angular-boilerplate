import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertType } from '../../enums/alert.enum';
import { TableParam } from '../../interfaces/table.param.interface';
import { AbstractListPageService } from '../../base-page/list-page/list-page.service';
import { catchError, of, tap } from 'rxjs';
import { HttpResult } from '../../interfaces/httpResult.interface';
import { getErrors } from '../../utils/helpers/helpers.utils';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends AbstractListPageService  implements AfterViewInit {

  public errorMessage: string;
  public alertType: AlertType = AlertType.error;
  public columnNumber: number = 0;
  private _defaultHeaders: string[];

  @Input() public params: TableParam;

  @Output() public onAdd: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onDelete: EventEmitter<any> = new EventEmitter<any>();

  public get defaultHeaders(){
    return this._defaultHeaders;
  }
  public set defaultHeaders(value: string[]){
    this._defaultHeaders = value;
    value.forEach(element => {
      if(typeof(this.data[0][element]) !== 'object' || this.data[0][element] === 'selected'){
        this.columnNumber++;
      }
    });
  }
  constructor(private cdref: ChangeDetectorRef){
      super();
      this.itemsPerPage = 10;
  }
  ngAfterViewInit(): void {
    if(this.params){
      if(this.params.data === undefined && this.params.callback === undefined)
        throw new Error('You must set data or callback in table params');
      //Set du nombre d'élements par page
      if(this.params.itemsPerPage)
        this.itemsPerPage = this.params.itemsPerPage;

      //Initialisation des données
      if(this.params.callback){
        this.params.callback.pipe(
          tap((response: any) => {
              //#region Si le paramètre selectable est à true, on ajoute une propriété selected à chaque élément du tableau
              if(this.params.selectable){
                response.data.forEach((element:any) => {
                  element.selected = false;
                });
              }
              //#endregion

              //#region Set des données
              this.data = response;
              this.requestEmmited = true;
              //#endregion

              //#region Set des headers de la table
              if(response.length > 0)
                this.defaultHeaders = Object.keys(response[0]);
              //#endregion
          }),catchError((error: any) => {
              this.alertType = AlertType.error;
              this.errorMessage = getErrors(error)
              this.data = [];
              this.requestEmmited = true;
              return of(null);
          })).subscribe();
      }else if(this.params.data){
        //#region Si le paramètre selectable est à true, on ajoute une propriété selected à chaque élément du tableau
        if(this.params.selectable){
          this.params.data.forEach((element:any) => {
            element.selected = false;
          });
        }
        //#endregion

        //#region Set des données
        this.data = this.params.data;
        this.requestEmmited = true;
        //#endregion

        //#region Set des headers de la table
        if(this.data.length > 0)
          this.defaultHeaders = Object.keys(this.data[0]);
        //#endregion

        this.cdref.detectChanges();
      }

    }
  }

  getType(value:any){
    return typeof value;
  }


  onClickAdd() {
    this.onAdd.emit(true);
  }

  onClickEdit() {
    this.onEdit.emit(this.getSelected()[0]);
  }

  onClickDelete() {
    this.onDelete.emit(this.getSelected());
  }
}
