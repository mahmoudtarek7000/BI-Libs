import { Component, Input } from '@angular/core';
import { DrawerSelectEvent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'Bi-Sidebar',
  templateUrl: './bi-side-bar.component.html',
  styleUrls: ['./bi-side-bar.component.scss']
})
export class BISideBarComponent {
  public selected = "";
  @Input() items!: Array<{
    text?: string;
    icon?: string;
    path?: string;
    speratorTitle?: string;
    selected?: boolean;
    separator?: boolean;
    disabeld?: boolean,
    children?: any;
  }>;
  collapsed: boolean = false;
  constructor() {
  }
  ngOnInit(): void {
  }

  public onSelect(ev: DrawerSelectEvent): void {
    this.collapsed = true;
    this.selected = ev.item.text;
  }
  changeBackGround(): void {
    this.collapsed = !this.collapsed;
  }
}
