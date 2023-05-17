import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CellClickEvent, CreateFormGroupArgs, GridComponent, GridItem, PageChangeEvent } from '@progress/kendo-angular-grid';
import { State, toODataString } from "@progress/kendo-data-query";
import { IColumns } from 'bi-interfaces/lib/interfaces/IColumns.interface';
import { AlertService } from '@full-fledged/alerts';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDataService } from 'bi-interfaces/lib/interfaces/IDataService';
import { IGrid } from 'bi-interfaces/lib/interfaces/IGrid';
@Component({
  selector: 'BI-Grid',
  templateUrl: './bi-grid.component.html',
  styleUrls: ['./bi-grid.component.scss']
})
export class BIGridComponent implements IGrid, OnInit, AfterViewInit {
	@Input() public DataService!: IDataService;
	@Input() Columns!: IColumns[];
	@Input() Key!: string;
  @Input() GridName!: string;
	@Output() CellClick = new EventEmitter<CellClickEvent>();
	@ViewChild("Grid") Mygrid!: GridComponent;
	form: any = {};
	formGroup!: FormGroup;
	GridData!: any;
	state: State = { skip: 0, take: 10 };
	rowIndex!: number;
	dataItem!: any;
	data: any;
	newForm: any = {};

	constructor(
		private formBuilder: FormBuilder,
		private alertService: AlertService
	) { }

	ngOnInit(): void {
		this.GetGridData();
		this.DataService.read(`$skip=${this.state.skip}&$top=10&$count=true`);
		this.createFormGroup = this.createFormGroup.bind(this);
	}

	ngAfterViewInit() {
		this.SelectedRowChanged();
		this.handleFormGroup();
	}

	handleFormGroup() {
		this.Columns.forEach(res => this.form[res.Name] = [{ value: res.DefaultValue, disabled: !res.IsEditable }, res.Validators]);
	}


	createFormGroup(args: CreateFormGroupArgs | any): FormGroup {
		this.rowIndex = args.rowIndex;
		const item = args.dataItem;
		this.formGroup = this.formBuilder.group(this.form);
		this.formGroup.patchValue(item)
		return this.formGroup;
	}

	GetGridData() {
		this.GridData = this.DataService;
		this.GridData.subscribe((res: any) => {
			this.data = res;
		});
	}

	BeforeAction() {
	}

	public pageChange(event: PageChangeEvent): void {
		this.state.skip = event.skip;
		this.DataService.read(`$skip=${this.state.skip}&$top=10&$count=true`);
		this.GetGridData();
	}

	public trackByItem(index: number, item: GridItem): any {
		return item.data;
	}

	SelectedRowChanged() {
		this.Mygrid.cellClick.subscribe((res: any) => {
			this.dataItem = res?.['dataItem'];
			this.CellClick.emit(res);
		});
	}

	AddRow() {
		this.Mygrid.addRow(this.createFormGroup(this.newForm));
	}

	DeleteRow() {
		this.DataService.delete(this.dataItem[this.Key]).subscribe((res: any) => {
			this.DataService.read(`$skip=${this.state.skip}&$top=10&$count=true`);
			this.GetGridData();
			this.alertService.success("Deleted Successfully");
		});
	};

	public cellClickHandler(args: CellClickEvent): void {
		if (!args.isEdited) {
			args.sender.editCell(
				args.rowIndex,
				args.columnIndex,
				this.createFormGroup(args)
			);
		}
	}

	onValueChange(e: any) {
		this.DataService.read(toODataString(e) + '&$count=true');
		this.GetGridData();
	}

	Cancel() {
		this.DataService.read(`$skip=${this.state.skip}&$top=10&$count=true`);
		this.GetGridData();
		this.Mygrid.closeRow(this.rowIndex);
	}

	Save() {
		this.BeforeAction();
		if (isNaN(this.rowIndex)) {
			// Save Create
			if (this.formGroup?.valid) {
				this.DataService.add(this.formGroup.value).subscribe((res: any) => {
					this.data['data'].push(this.formGroup.value);
					this.Mygrid.closeRow();
					this.GetGridData();
					this.handleFormGroup();
					this.alertService.success("Saved Successfully");
				});
			};
		} else {
			// Save Update
			if (this.formGroup?.valid) {
				this.DataService.edit(this.formGroup.value, this.formGroup.value[this.Key]).subscribe((res: any) => {
					this.Mygrid.closeRow(this.rowIndex);
					this.DataService.read(`$skip=${this.state.skip}&$top=10&$count=true`);
					this.GetGridData();
					this.handleFormGroup();
					this.alertService.success("Saved Successfully");
				});
			};
		};
	}

}
