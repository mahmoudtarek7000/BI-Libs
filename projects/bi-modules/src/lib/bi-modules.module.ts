import { NgModule } from '@angular/core';
import { BiNavComponent } from './components/BI-Nav/bi-nav.component';
import {ButtonModule} from "@progress/kendo-angular-buttons";



@NgModule({
  declarations: [
    BiNavComponent
  ],
  imports: [
    ButtonModule
  ],
  exports: [
    BiNavComponent
  ]
})
export class BIModulesModule { }
