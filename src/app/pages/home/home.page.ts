import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AbstractListPageService } from 'src/app/lib/base-page/list-page/list-page.service';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage extends AbstractListPageService implements OnInit, AfterViewInit {
  listStyle : number      = 2
  svgs      : SafeHtml[]  = [];

  constructor(private _router: Router, private sanitizer: DomSanitizer) {
    super();
    this.data       = this.getApps();
  }
  //////////////
  //Events
  //////////////
  ngOnInit(): void {
    this.Sort('title');

    this.data.forEach((app: any) => {
      this.svgs.push(this.sanitizer.bypassSecurityTrustHtml(app.icon));
    });
  }

  ngAfterViewInit(): void {
    this.setAnimation();
  }

  onClickCard(route: string) {
    switch (route) {
      case 'stat-piis':
        this._router.navigate(['stat-piis']);
        break;
      case 'contrat':
        this._router.navigate(['contrat']);
        break;
      case 'individu':
        this._router.navigate(['individu']);
        break;
      case 'paiement':
        this._router.navigate(['paiement']);
        break;
      case 'notification-rouge-dans-paiement':
        this._router.navigate(['notification-rouge-paiement']);
        break;
    }
  }

  onClickListStyle(style: number) {
    this.listStyle = style;
    this.setAnimation(true);
    this.setAnimation();
  }

  Sort(sort: string, filtered: boolean = false) {
    this.data.sort((a: any, b: any) => a[sort] > b[sort] ? 1 : -1);
  }



  //////////////
  //private methods
  //////////////
  private setAnimation(remove: boolean = false) {
    //Remove css class to all elements with class "card"
    const cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
      if (remove) {
        cards[i].classList.remove('animate__bounceInRight', 'animate__bounceInUp', 'animate__bounceInLeft', 'animate__bounceInDown');
      } else {
        if (this.listStyle == 1){
          cards[i].classList.add('animate__bounceInUp');
        }else{
          //Generate random number between 0 and 4
          const random = [0, 1, 2, 3][Math.floor(Math.random() * 4)];
          if(random == 0)
            cards[i].classList.add('animate__bounceInRight');
          else if (random == 1)
            cards[i].classList.add('animate__bounceInLeft');
          else if (random == 2)
            cards[i].classList.add('animate__bounceInUp');
          else
            cards[i].classList.add('animate__bounceInDown');
        }

        (cards[i] as HTMLElement).style.animationDelay = `${i * 0.05}s`;
      }
    }
  }

  private getApps() {
    return [
      {
        id : 'stat-piis',
        icon : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                  </svg>`,
        title : 'Stat piis',
        description : 'Liste les contrats PIIS en fonction de la date de délivrance',
        color : 'slate'
      },
      {
        id : 'contrat',
        icon : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
                `,
        title : 'Contrat',
        description : 'Affiche les informations relatives du contrat correspondant comme les évaluations, avenants etc...',
        color : 'blue'
      },
      {
        id : 'individu',
        icon : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>`,
        title : 'Individu',
        description : 'Liste les contrats de l\'individu correspondant',
        color : 'yellow'
      },
      {
        id : 'paiement',
        icon : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        `,
        title : 'Stat code 9 prime covid',
        description : 'Liste les contrats code 9 prime covid entre deux dates',
        color : 'green'
      },
      {
        id : 'notification-rouge-dans-paiement',
        icon : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
      </svg>
        `,
        title : 'Notification rouge dans paiement',
        description : 'Liste les notifications rouges dans paiement entre deux dates',
        color : 'red'
      }
    ];
  }
}
