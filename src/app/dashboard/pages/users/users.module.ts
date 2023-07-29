import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FormDialogComponent } from './components/user-form-dialog/form-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { UserTableComponent } from './components/user-table/user-table.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsersDetailComponent } from './pages/users-detail/users-detail.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    UsersComponent,
    FormDialogComponent,
    UserTableComponent,
    UsersDetailComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    SharedModule,
    MatProgressSpinnerModule,
    RouterModule,
    NgIf
  ],
  exports: [
    UsersComponent,
  ]
})
export class UsersModule {

}
