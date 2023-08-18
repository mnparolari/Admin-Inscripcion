import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { InscriptionActions } from './store/inscription.actions';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionsDialogComponent } from './components/inscriptions-dialog/inscriptions-dialog.component';
import { InscriptionService } from './services/inscription.service';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent implements OnInit, OnDestroy {
  showSpinner = true;
  private subscription!: Subscription;

  constructor(private spinner: SpinnerService, private store: Store, public dialog: MatDialog, private inscriptionService: InscriptionService, private notifier: NotifierService) { }

  onAdd(): void {
    this.dialog.open(InscriptionsDialogComponent, {
      data: { inscription: null, isEditing: false }
    });
  }

  ngOnInit(): void {
    this.subscription = this.spinner.getSpinner().subscribe((show: boolean) => {
      this.showSpinner = show;
    });
    this.spinner.show();
    this.store.dispatch(InscriptionActions.loadInscriptions())
    this.spinner.hide();
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
