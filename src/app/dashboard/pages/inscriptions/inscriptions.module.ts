import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionsComponent } from './inscriptions.component';
import { InscriptionRoutingModule } from './inscriptions-routing.module';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InscriptionsTableComponent } from './components/inscriptions-table/inscriptions-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { InscriptionsDialogComponent } from './components/inscriptions-dialog/inscriptions-dialog.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { InscriptionEffects } from './store/inscription.effects';
import { inscriptionFeature } from './store/inscription.reducer';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { InscriptionsDetailComponent } from './pages/inscriptions-detail/inscriptions-detail.component';


@NgModule({
  declarations: [
    InscriptionsComponent,
    InscriptionsTableComponent,
    InscriptionsDialogComponent,
    InscriptionsDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule,
    InscriptionRoutingModule,
    RouterModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatStepperModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    StoreModule.forFeature(inscriptionFeature),
    EffectsModule.forFeature([InscriptionEffects]),
  ],
  exports: [
    InscriptionsComponent
  ]
})
export class InscriptionsModule { }
