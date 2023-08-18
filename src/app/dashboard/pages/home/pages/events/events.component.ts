import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/core/services/spinner.service';

export interface Events {
  title: string,
  img: string,
  date: string,
  link: string
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
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

  typeEvents: Events[] = [
    {
      title: 'Open-Coder 6° Edición Chile',
      img: './assets/img/opencoder1.png',
      date: '11/08/2023',
      link: 'https://lu.ma/6ttfnjkz'
    },
    {
      title: 'Webinar - Potencia tu búsqueda laboral',
      img: './assets/img/webinar1.png',
      date: '17/08/2023',
      link: 'https://lu.ma/estrategiadebusquedalaboral'
    },
    {
      title: 'Meetup - De la teoría a la práctica',
      img: './assets/img/meetup1.png',
      date: '17/08/2023',
      link: 'https://lu.ma/MicuCambioCarrera'
    },
    {
      title: 'Meetup - ¡Hackeá la mente de tus consumidores!',
      img: './assets/img/meetup2.png',
      date: '22/08/2023',
      link: 'https://lu.ma/neuromarketingaprendeavender'
    },
    {
      title: 'Webinar - De Jr a Sr. Las claves para un buen desarrollo profesional',
      img: './assets/img/webinar2.png',
      date: '24/08/2023',
      link: 'https://lu.ma/ManuJrSr'
    },
    {
      title: 'OpenCoder Rosario - Presencial',
      img: './assets/img/opencoderr.png',
      date: '25/08/2023',
      link: 'https://lu.ma/opencoderrosario'
    },
    {
      title: 'Coffee and Chat: Desbloqueando tu Potencial con Habilidades Blandas',
      img: './assets/img/coffechat1.png',
      date: '29/08/2023',
      link: 'https://lu.ma/coffeeandchat27'
    },
    {
      title: 'OpenCoder Mendoza - Presencial',
      img: './assets/img/opencoderm.png',
      date: '01/09/2023',
      link: 'https://lu.ma/opencodermendoza'
    },
    {
      title: 'OpenCoder Córdoba - Presencial',
      img: './assets/img/opencoderc.png',
      date: '08/09/2023',
      link: 'https://lu.ma/OpencoderCordoba'
    },
    {
      title: 'Graduación Coder Buenos Aires - Presencial',
      img: './assets/img/graduacion.png',
      date: '21/09/2023',
      link: 'https://lu.ma/GraduacionCoder'
    },
  ]
}
