import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HomeModule } from './pages/home/home.module';
import { MatMenuModule } from '@angular/material/menu';
import { NgIf } from '@angular/common';
import { UsersModule } from './pages/users/users.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    HomeModule,
    UsersModule,
    SharedModule,
    NgIf,
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
