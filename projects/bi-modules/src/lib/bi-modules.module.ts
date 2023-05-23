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
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { CommonModule } from '@angular/common';
import { BIGridLayoutComponent } from './components/bi-grid-layout/bi-grid-layout.component';
import { BIGridLayoutItemComponent } from './components/bi-grid-layout-item/bi-grid-layout-item.component';


@NgModule({
  declarations: [
    BiNavComponent,
    BIGridComponent,
    BIGridLayoutComponent,
    BIGridLayoutItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DateInputsModule,
    GridModule,
    ReactiveFormsModule,
    PagerModule,
    FilterModule,
    DropDownListModule,
    ButtonModule,
    CommonModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, positionY: "top" }),
    LayoutModule
  ],
  exports: [
    BiNavComponent,
    BIGridComponent,
    BIGridLayoutComponent,
    BIGridLayoutItemComponent
  ]
})
export class BIModulesModule { }
