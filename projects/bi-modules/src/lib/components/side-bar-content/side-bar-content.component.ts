import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'SideBar-content',
  templateUrl: './side-bar-content.component.html',
  styleUrls: ['./side-bar-content.component.scss']
})
export class SideBarContentComponent {
  @Input() selectedItem!: string;
  @Input() items: any;
  @Input() collapsed!: boolean;
  @Output() backToNav = new EventEmitter<any>();

  returnToNav(): void {
    this.selectedItem = "";
    this.collapsed = false;
    this.backToNav.emit();
  }
}
