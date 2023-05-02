import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/lib/services/auth/auth.service';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.page.html',
  styleUrls: ['./getting-started.page.scss']
})
export class GettingStartedPage implements OnInit {

  constructor(private _authService:AuthService, private _router:Router) {
    this._authService.logout();
    this._router.navigate(['/getting-started']);
  }

  ngOnInit(): void {
  }

}
