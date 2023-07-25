import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { MyNotification } from '../models/notifier';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  private notifier$ = new Subject<MyNotification>();

  constructor() {
    this.notifier$.subscribe({
      next: (notification) => {
        Swal.fire(notification.title, notification.message, notification.type)
      }
    })
  }

  showSucces(title: string, message: string): void {
    this.notifier$.next({
      type: 'success',
      title,
      message
    })
  };

  showError(title: string, message: string): void {
    this.notifier$.next({
      type: 'error',
      title, 
      message
    })
  }
}
