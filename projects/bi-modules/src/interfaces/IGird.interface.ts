import { Observable } from "rxjs";

export interface IGrid {
    DataService: any,
    GridData: Observable<any>,
    Columns: Object,
    Key: string,
    SelectedRowChanged: () => void;
    BeforeAction: () => void;
    AddRow: () => void;
    DeleteRow: () => void;
    Cancel: () => void;
    Save: () => void;
}