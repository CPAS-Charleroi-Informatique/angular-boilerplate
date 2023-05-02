import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  public readonly appName: string = environment.appName || 'App Name';
  public readonly appAcronym: string = environment.appAcronym || 'AN';
  public readonly appLogo: string = environment.appLogo || 'assets/images/logo.png';
}
