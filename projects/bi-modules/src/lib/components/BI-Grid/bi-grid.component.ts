import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CellClickEvent, CellCloseEvent, CreateFormGroupArgs, GridComponent, GridItem, PageChangeEvent } from '@progress/kendo-angular-grid';
import { State, toODataString } from "@progress/kendo-data-query";
import { AlertService } from '@full-fledged/alerts';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IColumns } from 'bi-interfaces/lib/interfaces/IColumns.interface';
import { IDataSource } from 'bi-interfaces/lib/interfaces/IDataSource';
import { IGrid } from 'bi-interfaces/lib/interfaces/IGrid';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
	selector: 'BI-Grid',
	templateUrl: './bi-grid.component.html',
	styleUrls: ['./bi-grid.component.scss']
})
export class BIGridComponent implements IGrid, OnInit {
	@Input() public DataService!: IDataSource;
	@Input() Columns!: IColumns[];
	@Input() Key!: string;
	@Input() GridName!: string;
	@Input() refGrid!: string;
	@Output() CellClick = new EventEmitter<CellClickEvent>();
	@ViewChild("Grid") Mygrid!: GridComponent;
	StopSave!: Subject<boolean>;
	CreatedItemArray: Array<Object> = [];
	UpdatedItemArray: Array<Object> = [];
	form: any = {};
	CurrentSelectRow!: FormGroup;
	GridData!: any;
	state: State = { skip: 0, take: 10 };
	rowIndex!: number;
	dataItem!: any;
	data: any;
	newForm: any = {};

	constructor(
		private formBuilder: FormBuilder,
		private alertService: AlertService,
		private cd: ChangeDetectorRef
	) { }

	ngOnInit(): void {
		this.GetGridData();
		this.DataService.read(`$skip=${this.state.skip}&$top=10&$count=true`);
		this.handleFormGroup();
		this.createFormGroup = this.createFormGroup.bind(this);
		this.StopSave = new Subject<boolean>();
		this.StopSave.next(true);
	}

	handleFormGroup() {
		this.Columns.forEach(res => this.form[res.Name] = [{ value: res.DefaultValue, disabled: !res.IsEditable }, res.Validators]);
		if (!this.CurrentSelectRow?.controls) this.CurrentSelectRow = this.formBuilder.group(this.form);
		this.CurrentSelectRow.valueChanges.subscribe(res => {
			if (this.dataItem) {
				Object.assign(this.dataItem, res);
			}
		})
	}

	createFormGroup(args: CreateFormGroupArgs | any): FormGroup {
		this.rowIndex = args.rowIndex;
		const item = args.dataItem;
		this.CurrentSelectRow.patchValue(item);
		console.log(this.CurrentSelectRow.value);
		
		return this.CurrentSelectRow;
	}

	GetGridData() {
		this.GridData = this.DataService;
		this.GridData.subscribe((res: any) => {
			this.data = res;
		});
	}

	BeforeAction(): void {
	}

	public pageChange(event: PageChangeEvent): void {
		this.state.skip = event.skip;
		this.DataService.read(`$skip=${this.state.skip}&$top=10&$count=true`);
		this.GetGridData();
	}

	cellCloseHandler(args: CellCloseEvent) {
		const { formGroup, dataItem } = args;
		if (!formGroup.valid) {
			// prevent closing the edited cell if there are invalid values.
			args.preventDefault();
		}
		this.assignValues(dataItem, formGroup.value);
		this.CurrentSelectRow.patchValue(formGroup.value);
		if (formGroup.dirty && !isNaN(this.rowIndex)) this.UpdatedItemArray.push({ ...formGroup.value });
	}

	public assignValues(target: any, source: any): void {
		Object.assign(target, source);
	}

	public trackByItem(index: number, item: GridItem): any {
		return item.data;
	}

	AddRow() {
		this.Cancel();
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
		this.dataItem = args.dataItem;
		this.CellClick.emit(args);
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
		this.CurrentSelectRow.reset();
		this.dataItem = null;
	}

	async Save() {
		if (!this.dataItem) this.CreatedItemArray.push({ ...this.createFormGroup(this.newForm).value });
		await this.BeforeAction();
		this.StopSave?.pipe(take(1)).subscribe((res: any) => {
			if (res) {
				if (isNaN(this.rowIndex)) {
					// Save Create
					if (this.CurrentSelectRow?.valid) {
						this.DataService.add(this.CurrentSelectRow.getRawValue()).subscribe((res: any) => {
							this.data['data'].unshift(this.CurrentSelectRow.getRawValue());
							this.Mygrid.closeRow();
							this.GetGridData();
							this.handleFormGroup();
							this.alertService.success("Saved Successfully");
						});
					};
				} else {
					// Save Update
					if (this.CurrentSelectRow?.valid) {
						this.DataService.edit(this.CurrentSelectRow.getRawValue(), this.CurrentSelectRow.getRawValue()[this.Key]).subscribe((res: any) => {
							this.Mygrid.closeRow(this.rowIndex);
							this.DataService.read(`$skip=${this.state.skip}&$top=10&$count=true`);
							this.GetGridData();
							this.handleFormGroup();
							this.alertService.success("Saved Successfully");
						});
					};
				};
			}
		});
	}

}
