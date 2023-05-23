import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-bi-grid-layout-item',
  templateUrl: './bi-grid-layout-item.component.html',
  styleUrls: ['./bi-grid-layout-item.component.css']
})
export class BIGridLayoutItemComponent {
  @Input() row!: number;
  @Input() col!: number;
  @Input() colSpan!: number;
  @Input() rowSpan!: number;
  constructor() {}
}
