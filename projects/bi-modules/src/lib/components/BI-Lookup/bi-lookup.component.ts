import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILookup } from 'bi-interfaces/lib/interfaces/ILookup';
import { CellClickEvent } from '@progress/kendo-angular-grid';
import { State, toODataString } from '@progress/kendo-data-query';
import { IDataSource } from 'bi-interfaces/lib/interfaces/IDataSource';
import { ModalService } from '../Services/modal.service';


@Component({
  selector: 'app-bi-lookup',
  templateUrl: './bi-lookup.component.html',
  styleUrls: ['./bi-lookup.component.css']
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

  @Input() DomID!: string;
  @Input() DataSource!: IDataSource;
  @Input() Key!: string;
  @Input() Title!: string;
  @Input() Description!: string
  @Input() rtlDescription!: string;
  @Input() IsDisabled: boolean;
  Isvalid: boolean;
  SelectedRow: any;
  lookupValue: any;
  GoToDefinitionURl!: string;

  ModalID!: string
  DescriptionText: string;
  gridData!: any[];
  data: any;
  ErrorMsg!: string;
  state: State = { skip: 0, take: 10 };

  constructor(private modal: ModalService) {
    this.IsDisabled = false;
    this.Isvalid = true;
    this.DescriptionText = "";
  }
  OnInputFocus() {
    this.OnFocus.emit(null);
  }
  OpenModal() {
    this.OnOpen.emit(null);
    this.getLookupData();
    this.modal.open(this.ModalID);
  }
  getLookupData(filter: any = null) {
    this.DataSource.read(filter == null ? `$skip=${this.state.skip}&$top=10&$count=true` : filter);
    this.data = this.DataSource;
    this.data.subscribe((res: any) => {
      this.gridData = res.data;
      console.log(res);

    });
    this.AfterLoad.emit(this.gridData);
  }
  ngOnInit(): void {
    this.BeforeLoad.emit(null);
    this.ModalID = this.Key + '_' + this.DomID;
  }
  cellClickHandler(args: CellClickEvent) {
    this.SelectedRow = args.dataItem;
    this.lookupValue = args.dataItem[this.Key];
    this.OnEnterGrid.emit(this.SelectedRow);
    this.ClearError();
  }
  CloseModal() {
    this.OnClose.emit(null);
    this.modal.close(this.ModalID);
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
  Save() {
    if (this.SelectedRow) {
      this.CloseModal();
      this.ReturnedValueEmitter.emit(this.SelectedRow);
    }
  }
  Cancel() {
    this.CloseModal();
  }
  dblClickEvent() {
    this.Save();
  }
  async OnTextChange(event: any): Promise<void> {
    var EnteredValue = event.target.value;
    this.DataSource.read("$filter=" + this.DataSource.Key + " eq '" + EnteredValue);
    this.data = this.DataSource;
    this.data.subscribe((res: any) => {
      this.gridData = res;
    });
    if (this.gridData && this.gridData.length > 0) {
      this.ClearError();
      this.ReturnedValueEmitter.emit(this.gridData[0]);
    }
    else {
      this.SetError(`can't find ${this.Key} with value = ${EnteredValue}`);
    }
  }
  showContextMenu(e: any) {
  }
}
