import { Component } from '@angular/core';
import { SelectEvent } from '@progress/kendo-angular-layout';

@Component({
    selector: 'lib-bi-tab-strip',
    templateUrl: './bi-tab-strip.component.html',
    styleUrls: ['./bi-tab-strip.component.css']
})
export class BITabStripComponent {

    constructor() { }

    public onTabSelect(e: SelectEvent): void {
        console.log(e);
    }


}
