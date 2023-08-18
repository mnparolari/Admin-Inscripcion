import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InscriptionsComponent } from './inscriptions.component';
import { InscriptionsDetailComponent } from './pages/inscriptions-detail/inscriptions-detail.component';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: InscriptionsComponent
            },
            {
                path: ':id',
                component: InscriptionsDetailComponent
            }
        ])
    ], exports: [RouterModule]
})
export class InscriptionRoutingModule { }