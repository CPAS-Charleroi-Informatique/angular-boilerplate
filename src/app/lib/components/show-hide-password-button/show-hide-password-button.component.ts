import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-hide-password-button',
  templateUrl: './show-hide-password-button.component.html',
  styleUrls: ['./show-hide-password-button.component.scss'],
})
export class ShowHidePasswordButtonComponent {
  @Input() inputId = "";
  show: boolean;
  readonly currentYear = new Date().getFullYear();

  constructor() {
    this.show = true;
  }


  onClickIcon(): void {
    const input = document.getElementById(this.inputId)
    if(input){
      if (input.getAttribute("type") === "password") {
        input.setAttribute("type", "text");
      } else {
        input.setAttribute("type", "password");
      }
    }

    this.show = !this.show;
  }
}
