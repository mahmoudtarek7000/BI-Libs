import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CellClickEvent, CellCloseEvent, CreateFormGroupArgs, GridComponent, GridItem } from '@progress/kendo-angular-grid';
import { State, toODataString } from "@progress/kendo-data-query";
import { AlertService } from '@full-fledged/alerts';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IColumns } from 'bi-interfaces/lib/interfaces/IColumns.interface';
import { IDataSource } from 'bi-interfaces/lib/interfaces/IDataSource';
import { IGrid } from 'bi-interfaces/lib/interfaces/IGrid';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
	selector: 'BI-Grid',
	templateUrl: './bi-grid.component.html',
	styleUrls: ['./bi-grid.component.scss']
})
export class BIGridComponent implements IGrid, OnInit {
	@Input() public DataService!: IDataSource;
	@Input() Columns!: IColumns[];
	@Input() GridName!: string;
	@Input() refGrid!: string;
	@Output() CellClick = new EventEmitter<CellClickEvent>();
	@ViewChild("Grid") Mygrid!: GridComponent;
	StopSave!: Subject<boolean>;
	StopDelete!: Subject<boolean>;
	CreatedItemArray: Array<Object> = [];
	UpdatedItemArray: Array<Object> = [];
	form: any = {};
	CurrentSelectRow!: FormGroup;
	GridData!: any;
	state: State = { skip: 0, take: 10 };
	rowIndex!: any;
	dataItem!: any;
	dataItemReset!: any;
	data: any;
	newForm: any = {};

	constructor(
		private formBuilder: FormBuilder,
		private alertService: AlertService,
		private cd: ChangeDetectorRef
	) { }

	ngOnInit() {
		this.DataService.Columns.forEach((res: any) => this.form[res.Name] = [""]);
		this.GetGridData();
		this.DataService.read(`$skip=${this.state.skip}&$top=10&$count=true`);
		this.handleFormGroup();
		this.createFormGroup = this.createFormGroup.bind(this);
		this.StopSave = new Subject<boolean>();
		this.StopSave.next(true);
		this.StopDelete = new Subject<boolean>();
		this.StopDelete.next(true);
	}

	handleFormGroup() {
		this.Columns.forEach(res => {
			if (this.form.hasOwnProperty(res.Name)) this.form[res.Name] = [{ value: res.DefaultValue, disabled: !res.IsEditable }, res.Validators]
		});
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
		this.dataItemReset = { ...args.dataItem };
		this.CurrentSelectRow.patchValue(item);
		return this.CurrentSelectRow;
	}

	GetGridData() {
		this.GridData = this.DataService;
		this.GridData.subscribe((res: any) => this.data = res);
	}

	BeforeActionSave(): void {
	}

	BeforeActionDelete(): void {
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
		if (isNaN(this.rowIndex) || !this.CurrentSelectRow.dirty) {
			this.Cancel("Add");
			this.Mygrid.addRow(this.createFormGroup(this.newForm));
		} else {
			Swal.fire({
				title: 'Please save the changes',
				icon: 'warning',
				showCloseButton: true,
				cancelButtonText: 'Cancel',
			})
		}
	}

	async DeleteRow() {
		await this.BeforeActionDelete();
		this.StopDelete?.pipe(take(1)).subscribe((res: any) => {
			if (res) {
				this.DataService.delete(this.dataItem[this.DataService.Key]).subscribe((res: any) => {
					this.DataService.read(`$skip=${this.state.skip}&$top=10&$count=true`);
					this.alertService.success("Deleted Successfully");
				});
			}
		})
	};

	public cellClickHandler(args: CellClickEvent): void {
		this.dataItem = args.dataItem;
		this.CellClick.emit(args);
		if (isNaN(this.rowIndex) && !this.CurrentSelectRow.dirty) {
			args.sender.editCell(
				args.rowIndex,
				args.columnIndex,
				this.createFormGroup(args)
			);
		} else if (this.rowIndex == args.rowIndex || !this.CurrentSelectRow.dirty) {
			args.sender.editCell(
				args.rowIndex,
				args.columnIndex,
				this.createFormGroup(args)
			);
		} else {
			Swal.fire({
				title: 'Please save the changes',
				icon: 'warning',
				showCloseButton: true,
				cancelButtonText: 'Cancel',
			})
		}
	}

	onValueChange(e: any) {
		this.state.skip = e.skip;
		this.DataService.read(toODataString(e) + '&$count=true');
	}

	Cancel(type?: string) {
		this.DataService.read(`$skip=${this.state.skip}&$top=10&$count=true`);
		this.Mygrid.closeRow(this.rowIndex);
		this.CurrentSelectRow.reset(type === "Add" ? {} : { ...this.dataItemReset });
		this.dataItem = undefined;
		this.dataItemReset = undefined;
		this.rowIndex = undefined;
	}

	async Save() {
		if (!this.dataItem) this.CreatedItemArray.push({ ...this.createFormGroup(this.newForm).value });
		await this.BeforeActionSave();
		this.StopSave?.pipe(take(1)).subscribe((res: any) => {
			if (res) {
				if (isNaN(this.rowIndex)) {
					// Save Create
					if (this.CurrentSelectRow?.valid) {
						this.DataService.add(this.CurrentSelectRow.getRawValue()).subscribe((res: any) => {
							this.data['data'].unshift(this.CurrentSelectRow.getRawValue());
							this.Mygrid.closeRow();
							this.handleFormGroup();
							this.alertService.success("Saved Successfully");
						});
					};
				} else {
					// Save Update
					if (this.CurrentSelectRow?.valid) {
						this.DataService.edit(this.CurrentSelectRow.getRawValue(), this.CurrentSelectRow.getRawValue()[this.DataService.Key]).subscribe((res: any) => {
							this.Mygrid.closeRow(this.rowIndex);
							this.DataService.read(`$skip=${this.state.skip}&$top=10&$count=true`);
							this.handleFormGroup();
							this.alertService.success("Saved Successfully");
						});
					};
				};
			}
		});
	}

}
