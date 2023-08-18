import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private showSpinner$ = new BehaviorSubject<boolean>(true);

  constructor() { }

  show(): void {
    this.showSpinner$.next(true);
  }

  hide(): void {
    timer(1000).pipe(take(1)).subscribe(() => {
      this.showSpinner$.next(false);
    });
  }

  getSpinner(): Observable<boolean> {
    return this.showSpinner$.asObservable();
  }
}
