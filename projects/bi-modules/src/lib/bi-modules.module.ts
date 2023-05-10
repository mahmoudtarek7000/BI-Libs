import { NgModule } from '@angular/core';

import { BIGridComponent } from './components/BI-Grid/bi-grid.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { PagerModule } from '@progress/kendo-angular-pager';
import { FilterModule } from '@progress/kendo-angular-filter';
import { BiNavComponent } from './components/BI-Nav/bi-nav.component';
import { AlertModule } from '@full-fledged/alerts';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    BiNavComponent,
    BIGridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DateInputsModule,
    GridModule,
    HttpClientModule,
    ReactiveFormsModule,
    PagerModule,
    FilterModule,
    ButtonModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, positionY: "top" }),
  ],
  exports: [
    BiNavComponent,
    BIGridComponent
  ]
})
export class BIModulesModule { }
