import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BlxCurrencyPipe } from './pipes/blx-currency.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HotTableModule } from '@handsontable-pro/angular';


@NgModule({
  declarations: [
    AppComponent,
    BlxCurrencyPipe
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    CalendarModule,
    InputMaskModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HotTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
