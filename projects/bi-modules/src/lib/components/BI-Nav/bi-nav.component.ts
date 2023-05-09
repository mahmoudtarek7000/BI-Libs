import {Component, Input, TemplateRef} from '@angular/core';
import {INav} from "../../../interfaces/inav";


@Component({
  selector: 'BI-Nav',
  templateUrl: 'bi-nav.component.html',
  styleUrls: ['bi-nav.component.scss']
})
export class BiNavComponent implements INav{
  @Input() BIGrid: any;


  /**
   * add new row to the grid
   * @return void
   */
  AddRow(): void{};
  /**
   * delete row from the grid
   * @return void
   */
  DeleteRow(): void{};
  /**
   * cancel edits in any cell
   * @return void
   */
  Cancel(): void{};
  /**
   * save edits in any cell
   * @return void
   */
  Save(): void {};
}
