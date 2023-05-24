import { Component, Input } from '@angular/core';

@Component({
    selector: 'BI-grid-layout',
    templateUrl: './bi-grid-layout.component.html',
    styleUrls: ['./bi-grid-layout.component.css']
})
export class BIGridLayoutComponent {
    @Input() rows!: Array<number | string>;
    @Input() cols!: Array<number | string>;
    @Input() gap!: number;

    constructor() { }
}
