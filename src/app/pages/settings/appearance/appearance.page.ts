import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.page.html',
  styleUrls: ['./appearance.page.scss']
})
export class AppearancePage implements OnInit {
  public slideOverState : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
