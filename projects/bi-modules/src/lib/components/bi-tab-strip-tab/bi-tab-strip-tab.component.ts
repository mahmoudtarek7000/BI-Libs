import { Component, Input } from '@angular/core';

@Component({
    selector: 'lib-bi-tab-strip-tab',
    templateUrl: './bi-tab-strip-tab.component.html',
    styleUrls: ['./bi-tab-strip-tab.component.css']
})
export class BITabStripTabComponent {
    @Input() title!: string;
    @Input() select: boolean = false;
    constructor() { }
}
