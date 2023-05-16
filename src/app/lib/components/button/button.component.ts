import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ButtonType } from '../../enums/button-type.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements AfterViewInit {
  @Input() type : ButtonType | string;
  @Input() text : string;


  constructor() { }

  ngAfterViewInit(): void {
    if(this.type === undefined || !Object.values(ButtonType).toString().includes(this.type)){
      throw new Error('You must set type in button params');
    } else if(this.text === undefined || this.text === '') {
      throw new Error('You must set text in button params');
    }
  }

}
