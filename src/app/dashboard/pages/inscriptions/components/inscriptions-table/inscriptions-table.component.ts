import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataInscription, Inscription } from '../../models/inscription';
import { selectInscriptions } from '../../store/inscription.selectors';
import { InscriptionActions } from '../../store/inscription.actions';
import Swal from 'sweetalert2';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { InscriptionsDialogComponent } from '../inscriptions-dialog/inscriptions-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-inscriptions-table',
  templateUrl: './inscriptions-table.component.html',
  styleUrls: ['./inscriptions-table.component.scss']
})
export class InscriptionsTableComponent {
  displayedColumns: string[] = ['icon', 'name', 'commission', 'teacher', 'students', 'actions'];
  inscriptions$: Observable<DataInscription[]>
  
  constructor(private store: Store, private notifier: NotifierService,  public dialog: MatDialog){
    this.inscriptions$ = this.store.select(selectInscriptions)
  }

  onDeleteInscription(data: number) {
    Swal.fire({
      title: `¿Estás seguro que queres eliminar esta inscripción?`,
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(InscriptionActions.loadDeleteInscription({ data }));
        this.notifier.showSucces('Eliminado', 'El registro ha sido eliminado correctamente');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.notifier.showError('Cancelado', 'La acción ha sido cancelada');
      }
    });
  }

  onEditInscription(inscription: Inscription): void {
    const dialogRef = this.dialog.open(InscriptionsDialogComponent, {
      data: { inscription, isEditing: true }
    });
  
    dialogRef.afterClosed().subscribe(updatedInscription => {
      if (updatedInscription) {
        this.store.dispatch(InscriptionActions.loadUpdateInscription({ payload: updatedInscription }));
      }
    });
  }
}
