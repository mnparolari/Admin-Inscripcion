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
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { UserTableComponent } from './components/user-table/users-table.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserDetailComponent } from './pages/users-detail/user-detail.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [
    UsersComponent,
    UserDialogComponent,
    UserTableComponent,
    UserDetailComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatStepperModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    NgIf
  ],
  exports: [
    UsersComponent,
  ]
})
export class UsersModule {

}
