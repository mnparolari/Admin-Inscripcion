import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { SpinnerService } from './core/services/spinner.service';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './dashboard/pages/courses/courses.module';
import { StudentsModule } from './dashboard/pages/students/students.module';
import { InscriptionsModule } from './dashboard/pages/inscriptions/inscriptions.module';
import { registerLocaleData, DatePipe } from '@angular/common';
import eslocale from '@angular/common/locales/es-AR';

registerLocaleData(eslocale);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    AuthModule,
    CoursesModule,
    StudentsModule,
    InscriptionsModule
  ],
  providers: [SpinnerService,

    {
      provide: LOCALE_ID,
      useValue: 'es-AR'
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
