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
import { BISideBarComponent } from './components/Bi-Side-bar/bi-side-bar.component';
import { IconsModule } from '@progress/kendo-angular-icons';
import { SideBarContentComponent } from './components/side-bar-content/side-bar-content.component';
import { DialogsModule } from "@progress/kendo-angular-dialog";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BiNavComponent,
    BIGridComponent,
    BIGridLayoutComponent,
    BIGridLayoutItemComponent,
    BISideBarComponent,
    SideBarContentComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, positionY: "top" }),
    IconsModule,
    BrowserAnimationsModule,
    DateInputsModule,
    BrowserAnimationsModule,
    GridModule,
    HttpClientModule,
    ReactiveFormsModule,
    PagerModule,
    FilterModule,
    LayoutModule,
    ButtonModule,
    DropDownListModule,
    DialogsModule,
    RouterModule
  ],
  exports: [
    BiNavComponent,
    BIGridComponent,
    BIGridLayoutComponent,
    BIGridLayoutItemComponent,
    BISideBarComponent,
    SideBarContentComponent
  ]
})
export class BIModulesModule { }
