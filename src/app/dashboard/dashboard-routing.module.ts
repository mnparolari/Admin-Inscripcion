import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'users',
                loadChildren: () => import('./pages/users/users.module').then((typescriptModule) => typescriptModule.UsersModule)
            },
            {
                path: 'courses',
                loadChildren: () => import('./pages/courses/courses.module').then((typescriptModule) => typescriptModule.CoursesModule)
            },
            {
                path: 'students',
                loadChildren: () => import('./pages/students/students.module').then((typescriptModule) => typescriptModule.StudentsModule)
            },
            {
                path: '**',
                redirectTo: 'home'
            }
        ])
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }