import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { BarChartComponent } from './pages/analytics/components/bar-chart/bar-chart.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { BenefitsComponent } from './pages/benefits/benefits.component';
import { NewsComponent } from './pages/news/news.component';
import { TutorialsComponent } from './pages/tutorials/tutorials.component';
import { EventsComponent } from './pages/events/events.component';
import { PieChartComponent } from './pages/analytics/components/pie-chart/pie-chart.component';
import { HomeRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    HomeComponent,
    BarChartComponent,
    PieChartComponent,
    AnalyticsComponent,
    BenefitsComponent,
    NewsComponent,
    TutorialsComponent,
    EventsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgChartsModule,
    SharedModule,
    HomeRoutingModule,
    RouterModule,
    MatIconModule,
    MatExpansionModule
  ],
  exports: [
    HomeComponent,
  ],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: false } }
  ]
})
export class HomeModule { }
