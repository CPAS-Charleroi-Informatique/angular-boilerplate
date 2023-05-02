import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { menu } from '../../enums/menu.enum';


@Component({
  selector: 'app-hamburger-button',
  templateUrl: './hamburger-button.component.html',
  styleUrls: ['./hamburger-button.component.scss'],
})
export class HamburgerButtonComponent {
  @Output() menuStatus = new EventEmitter<string>();

  constructor() {
    this.menuStatus.emit(menu.closed);
   }

  onClickButton(){
    const button =  document.querySelector("#hamburger-button");
    if(button){
      button.classList.toggle("opened");
      button.setAttribute("aria-expanded", button.classList.contains("opened").toString());
    }

    if(button?.getAttribute("aria-expanded") === "true")
      this.menuStatus.emit(menu.opened);
    else
      this.menuStatus.emit(menu.closed);

  }
}
