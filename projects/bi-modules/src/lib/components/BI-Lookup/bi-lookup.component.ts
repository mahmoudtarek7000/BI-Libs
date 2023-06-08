import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ILookup } from 'bi-interfaces/lib/interfaces/ILookup.interface';
import { CellClickEvent } from '@progress/kendo-angular-grid';
import { State, toODataString } from '@progress/kendo-data-query';
import { IDataSource } from 'bi-interfaces/lib/interfaces/IDataSource';
import { ModalService } from '../Services/modal.service';


@Component({
  selector: 'app-bi-lookup',
  templateUrl: './bi-lookup.component.html',
  styleUrls: ['./bi-lookup.component.scss']
})
export class BILookupComponent implements OnInit, ILookup {

  @Output() ReturnedValueEmitter = new EventEmitter<any>();
  @Output() OnFocus = new EventEmitter<any>();
  @Output() OnOpen = new EventEmitter<any>();
  @Output() BeforeLoad = new EventEmitter<any>();
  @Output() AfterLoad = new EventEmitter<any>();
  @Output() OnEnterGrid = new EventEmitter<any>();
  @Output() OnClose = new EventEmitter<any>();
  @Output() OnHover = new EventEmitter<any>();

  @Input() DomID: string | undefined;
  @Input() DataSource!: IDataSource;
  @Input() Key: string | undefined;
  @Input() Title!: string;
  @Input() Description!: string
  @Input() rtlDescription!: string;
  @Input() IsDisabled: boolean;
  @Input() lookupValue: any;
  @Input() formGroup: any;
  Isvalid: boolean;
  SelectedRow: any;
  GoToDefinitionURl!: string;
  public opened!: boolean;
  ModalID!: string
  DescriptionText: string;
  gridData!: any[];
  data$: any;
  ErrorMsg!: string;
  state: State = { skip: 0, take: 10 };

  constructor() {
    this.IsDisabled = false;
    this.Isvalid = true;
    this.DescriptionText = "";
  }
  OnInputFocus() {
    this.OnFocus.emit(null);
  }

  public CloseModal(): void {
    this.opened = false;
    this.OnClose.emit(null);
  }

  OpenModal() {
    this.opened = true;
    this.getLookupData();
    this.OnOpen.emit(null);
  }

  getLookupData(filter: any = null) {
    this.DataSource?.read(filter == null ? `$skip=${this.state.skip}&$top=10&$count=true` : filter);
    this.AfterLoad.emit(this.gridData);
  }

  ngOnInit(): void {
    this.data$ = this.DataSource;
    this.data$?.subscribe((res: any) => {
      this.gridData = res.data;
      if (!this.opened && this.gridData) {
        if (this.gridData.length) {
          this.ClearError();
          this.ReturnedValueEmitter.emit(this.gridData[0]);
        }
        else this.SetError("Error")
      }
    });
    this.BeforeLoad.emit(null);
    this.ModalID = this.Key + '_' + this.DomID;
  }

  cellClickHandler(args: CellClickEvent) {
    this.SelectedRow = args.dataItem;
    this.ClearError();
  }
  OnInputHover() {
    this.DescriptionText = this.SelectedRow ? this.SelectedRow[this.Description] : "";
    this.OnHover.emit(null);
  }
  public SetIsDisable(IsDisabled: boolean) {
    this.IsDisabled = IsDisabled
  }
  FilterChange(e: any) {
    if (this.DataSource?.IsClientSideFilter != true) {
      this.state.skip = e.skip;
      this.getLookupData(toODataString(e) + "&$count=true");
    }
  }
  SetError(ErrMsg: string) {
    this.Isvalid = false;
    this.ErrorMsg = ErrMsg
  }
  ClearError() {
    this.Isvalid = true;
    this.ErrorMsg = '';
  }
  Ok() {
    if (this.SelectedRow) {
      this.CloseModal();
      if (this.Key) this.formGroup.patchValue(this.SelectedRow[this.Key]);
      this.ReturnedValueEmitter.emit(this.SelectedRow);
    }
  }
  Cancel() {
    this.CloseModal();
  }
  dblClickEvent() {
    this.Ok();
  }
  async OnTextChange(event: any): Promise<void> {
    var EnteredValue = event.target.value;
    if (!event.target.value) return;
    this.DataSource.read("$filter=" + this.DataSource.Key + " eq '" + EnteredValue + "'");

  }
  showContextMenu(e: any) {
  }
}
