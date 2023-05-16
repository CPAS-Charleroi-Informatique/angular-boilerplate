import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ButtonType } from '../../enums/button-type.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements AfterViewInit {
  @Input() type : ButtonType | string;

  constructor() { }

  ngAfterViewInit(): void {
    if(this.type === undefined || !Object.values(ButtonType).toString().includes(this.type)){
      this.type = ButtonType.create;
    }
  }

}
