import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/core/services/spinner.service';

export interface Benefits {
  name: string,
  img: string, 
  description: string,
  link: string
}

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent implements OnInit, OnDestroy {
  showSpinner = true;
  private subscription!: Subscription;

  constructor(private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.subscription = this.spinner.getSpinner().subscribe((show: boolean) => {
      this.showSpinner = show;
    });
    this.spinner.show();
    this.spinner.hide();
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

  cardBenefits: Benefits[] = [
    {
      name: 'Figma',
      img: './assets/img/figma.png',
      description: `Plan profesional gratuito para estudiantes y educadores.`,
      link: 'https://www.figma.com/login'
    },
    {
      name: 'Adobe',
      img: './assets/img/adobeadobe.png',
      description: `Programas y aplicaciones para el diseño y la edición de imágenes, vídeo y páginas web.`,
      link: 'https://www.adobe.com/'
    },
    {
      name: 'Payoneer',
      img: './assets/img/payoneer.png',
      description: `Plataforma de pagos cross-border. Te permite pagar y cobrar a nivel internacional fácilmente.`,
      link: 'https://www.payoneer.com/es/'
    },
    {
      name: 'Buzzmonitor',
      img: './assets/img/buzz.png',
      description: `Plataforma de gestión de redes sociales.`,
      link: 'https://getbuzzmonitor.com/es/'
    },
    {
      name: 'Get on Board',
      img: './assets/img/get.png',
      description: `Aprovecha los diferentes tests que tiene Get On Board para medir tus habilidades profesionales.`,
      link: 'https://welcome.getonbrd.com/home'
    },
    {
      name: 'Utoppia',
      img: './assets/img/utoppia.png',
      description: `Utoppia es un Neobank que ofrece acceso a una cuenta en dólares, 100% digital.`,
      link: 'https://www.utoppia.com/'
    },
  ];

}
