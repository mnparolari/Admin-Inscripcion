import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CoursesDetailComponent } from './pages/courses-detail/courses-detail.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CoursesComponent
    },
    {
        path: ':id',
        component: CoursesDetailComponent,
    }
    ])
  ],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
