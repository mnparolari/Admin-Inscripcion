import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { adminGuard } from '../core/guards/admin.guard';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'home',
                loadChildren: () => import('./pages/home/home.module').then((typescriptModule) => typescriptModule.HomeModule)
            },
            {
                path: 'users',
                canActivate: [adminGuard],
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
                path: 'inscriptions',
                loadChildren: () => import('./pages/inscriptions/inscriptions.module').then((typescriptModule) => typescriptModule.InscriptionsModule)
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