import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { UsersComponent } from './dashboard/pages/users/users.component';
import { CoursesComponent } from './dashboard/pages/courses/courses.component';
import { UsersDetailComponent } from './dashboard/pages/users/pages/users-detail/users-detail.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { CoursesDetailComponent } from './dashboard/pages/courses/pages/courses-detail/courses-detail.component';
import { StudentsComponent } from './dashboard/pages/students/students.component';
import { StudentsDetailComponent } from './dashboard/pages/students/pages/students-detail/students-detail.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            component: UsersComponent
          },
          {
            path: ':id',
            component: UsersDetailComponent
          }
        ]
      },
      {
        path: 'courses',
        children: [
          {
            path: '',
            component: CoursesComponent
          },
          {
            path: ':commission',
            component: CoursesDetailComponent
          }
        ]
      },
      {
        path: 'students',
        children: [
          {
            path: '',
            component: StudentsComponent
          },
          {
            path: ':id',
            component: StudentsDetailComponent
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register', 
        component: RegisterComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
