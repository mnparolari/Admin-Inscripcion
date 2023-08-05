import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentsDetailComponent } from './pages/students-detail/students-detail.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: StudentsComponent
    },
    {
        path: ':id',
        component: StudentsDetailComponent
    }
    ])
  ],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
