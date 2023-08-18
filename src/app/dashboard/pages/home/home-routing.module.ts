import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { BenefitsComponent } from './pages/benefits/benefits.component';
import { NewsComponent } from './pages/news/news.component';
import { TutorialsComponent } from './pages/tutorials/tutorials.component';
import { EventsComponent } from './pages/events/events.component';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'analytics',
                component: AnalyticsComponent
            },
            {
                path: 'benefits',
                component: BenefitsComponent
            },
            {
                path: 'news',
                component: NewsComponent
            },
            {
                path: 'tutorials',
                component: TutorialsComponent
            },
            {
                path: 'events',
                component: EventsComponent
            }
        ])
    ], exports: [RouterModule]
})
export class HomeRoutingModule { }