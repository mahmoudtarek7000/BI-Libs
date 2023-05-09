import { NgModule } from '@angular/core';
import { BiNavComponent } from './components/BI-Nav/bi-nav.component';
import {ButtonModule} from "@progress/kendo-angular-buttons";
import { BIGridComponent } from './components/BI-Grid/bi-grid.component';



@NgModule({
  declarations: [
    BiNavComponent,
    BIGridComponent
  ],
  imports: [
    ButtonModule
  ],
  exports: [
    BiNavComponent
  ]
})
export class BIModulesModule { }
