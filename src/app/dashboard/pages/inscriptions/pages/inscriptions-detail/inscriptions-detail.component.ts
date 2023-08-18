import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map, tap } from 'rxjs';
import { DataInscription } from '../../models/inscription';
import { Store } from '@ngrx/store';
import { selectInscriptions } from '../../store/inscription.selectors';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inscriptions-detail',
  templateUrl: './inscriptions-detail.component.html',
  styleUrls: ['./inscriptions-detail.component.scss']
})
export class InscriptionsDetailComponent implements OnInit, OnDestroy{
  inscriptions$: Observable<DataInscription[]>;
  showSpinner = true;
  private subscription!: Subscription;
  public inscriptionId?: number;
  public selectedInscription$: Observable<DataInscription | undefined>;

  
  constructor(private store: Store, private spinner: SpinnerService, private activatedRoute: ActivatedRoute, private router: Router){
    if (!Number(this.activatedRoute.snapshot.paramMap.get('id'))) {
      this.router.navigate(['dashboard', 'inscriptions']);
    } else {
      this.inscriptionId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
    this.inscriptions$ = this.store.select(selectInscriptions);
    this.selectedInscription$ = this.inscriptions$.pipe(
      map((inscriptions) => inscriptions.find(inscription => inscription.id === this.inscriptionId))
    );
  };

  ngOnInit(): void {
    this.subscription = this.spinner.getSpinner().subscribe((show: boolean) => {
      this.showSpinner = show;
    });
    this.spinner.show();
    this.selectedInscription$.subscribe(() => {
      this.spinner.hide();
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };
}

