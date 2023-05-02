import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage {
  public username: string | "";

  constructor(private _activatedRoute: ActivatedRoute) {
    this.username = this._activatedRoute.snapshot.paramMap.get('username');
  }

}
