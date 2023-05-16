import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-slide-over',
  templateUrl: './slide-over.component.html',
  styleUrls: ['./slide-over.component.scss']
})
export class SlideOverComponent implements OnInit {
  public opened: boolean = true;

  @Input() public title: string = '';
  @Output() public onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {

    window.onscroll = function(ev) {
      if(window.scrollY > 50){
        document.getElementById("slide-over").style.top = "0";
        document.getElementById("backdrop").style.top = "0";
      }else{
        document.getElementById("slide-over").style.top = "50px";
        document.getElementById("backdrop").style.top = "50px";
      }
  };
  }

  onClickCloseButton(){
    this.opened = false;
    this.onClose.emit(false);
  }


}
