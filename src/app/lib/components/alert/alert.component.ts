import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertType } from '../../enums/alert.enum';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements AfterViewInit {
  @Input() alertType: AlertType;
  @Input() message: string;
  @Input() title: string;
  @Input() displayTime: number;
  @Output() clear = new EventEmitter<string>();
  constructor() {

  }

  ngAfterViewInit(): void {
    if(this.displayTime < 2000)
      this.displayTime = 2000;

      if(this.alertType == AlertType.success && this.title)
        this.title = 'Succès';
      else if(this.alertType == AlertType.error && this.title)
        this.title = 'Erreur';
      else if(this.alertType == AlertType.warning && this.title)
        this.title = 'Attention';
      else if(this.alertType == AlertType.info && this.title)
        this.title = 'Information';

    // Fixme : cette partie ne fonctionne pas correctement - fait disparaitre le component
    // const alertContainer = document.getElementById('alert-container');
    // if (this.displayTime > 0 && alertContainer) {
    //   setTimeout(() => {
    //     if(alertContainer){
    //       alertContainer.classList.remove("animate__slideInUp");
    //       alertContainer.classList.add("animate__slideOutDown");
    //     }},this.displayTime);
    // }
    // else if(alertContainer){
    //   alertContainer.classList.add("animate__slideOutDown");
    // }
  }


  onClickDismiss(): void {
    this.clear.emit('');
  }
}
