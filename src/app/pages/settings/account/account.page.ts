import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TableParam } from 'src/app/lib/interfaces/table.param.interface';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss']
})
export class AccountPage implements OnInit {
  public tableParam: TableParam;
  constructor(private http : HttpClient) {

    this.tableParam = {
      //  callback: this.http.get('https://jsonplaceholder.typicode.com/users'),
      data:[
        {
          id: 1,
          name: 'Le nom',
          email: 'Email',
          phone: 'Téléphone',
          actif: true,
          roles: [
            {
              id: 1,
              name: 'Admin',
              test: 'test',
              bool: false,
              obj:{
                test: 'test',
              }
            },
            {
              id: 2,
              name: 'User',
              test: 'test',
              bool: true,
              obj:{
                test: 'test',
              }
            }
          ]
        },
        {
          id: 2,
          name: 'Le nom',
          email: 'Email',
          phone: 'Téléphone',
          actif:false,
          roles: [
            {
              id: 1,
              name: 'Admin',
              test: 'test',
              bool: false,
              obj:{
                test: 'test',
              }
            },
            {
              id: 2,
              name: 'User',
              test: 'test',
              bool: true,
              obj:{
                test: 'test',
              }
            }
          ]
        }
      ],
      itemsPerPage: 10,
      title: 'Liste des utilisateurs',
      selectable: true,
      addable: true,
      editable: true,
      deletable: true,
      backgroundClass: 'bg-slate-50',
      // childProperty: 'address',
      childProperty: 'roles',
    }
  }

  ngOnInit(): void {

  }

  Edit(event: any) {
    console.log(event);
  }

  Add(event: any) {
    console.log(event);
  }

  Delete(event: any) {
    console.log(event);
  }

}
