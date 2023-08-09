import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerService } from './core/services/spinner.service';
import { registerLocaleData, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import eslocale from '@angular/common/locales/es-AR';
import { StoreModule } from '@ngrx/store';
import { appReduce } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

registerLocaleData(eslocale);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(appReduce, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
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
