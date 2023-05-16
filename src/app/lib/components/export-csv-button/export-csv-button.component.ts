import { Component, Input, OnInit } from '@angular/core';
import { downloadFile, objectToCSV } from '../../utils/helpers/helpers.utils';

@Component({
  selector: 'app-export-csv-button',
  templateUrl: './export-csv-button.component.html',
  styleUrls: ['./export-csv-button.component.scss']
})
export class ExportCsvButtonComponent implements OnInit {

  @Input() data: any;
  @Input() fileName: string;
  constructor() { }

  ngOnInit(): void {
  }

  /*
  * Fonction permettant de télécharger le fichier csv
  */
  onClickDownload() {
    const data = objectToCSV(this.data);
    downloadFile(data, this.fileName);
  }
}

