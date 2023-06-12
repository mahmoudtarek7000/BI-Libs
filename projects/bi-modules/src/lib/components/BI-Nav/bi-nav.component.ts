import { Component, ElementRef, Input, TemplateRef } from '@angular/core';
import { INav } from "bi-interfaces/lib/interfaces/inav";
import { IGrid } from 'bi-interfaces/lib/interfaces/IGrid';


@Component({
  selector: 'BI-Nav',
  templateUrl: 'bi-nav.component.html',
  styleUrls: ['bi-nav.component.scss']
})
export class BiNavComponent implements INav {
  @Input() BIGrid!: IGrid;
  @Input() enableSave!: boolean;
  opened: boolean = false;
  constructor() {
  }
  DomID: string | undefined;

  /**
   * add new row to the grid
   * @return void
   */
  AddRow(): void {
    this.BIGrid.AddRow();
  };
  /**
   * delete row from the grid
   * @return void
   */
  DeleteRow(): void {
    this.BIGrid.DeleteRow();
  };
  /**
   * save edits in any cell
   * @return void
   */
  Cancel(): void {
    this.BIGrid.Cancel();
  };
  /**
   * save edits in any cell
   * @return void
   */
  Save(): void {
    if(this.BIGrid.CurrentSelectRow.dirty) {
      this.BIGrid.Save();
    }
  };

  /**
  * info in any cell
  * @return void
  */
  Info(): void {
    if (this.BIGrid.CurrentSelectRow.value[this.BIGrid.DataService.Key]) this.opened = true;
  };

  /**
    * close info popup
    * @return void
  */
  Close(): void {
    this.opened = false;
  }
}
