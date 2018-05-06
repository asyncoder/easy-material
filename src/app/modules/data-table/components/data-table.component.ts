/**
 * @license
 * Copyright Omar Amrani. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license
 */
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  OnChanges
} from "@angular/core";

import { DataSource } from "@angular/cdk/collections";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

import { Observable, fromEvent } from "rxjs";

import { Control, Field, LogicalOperator, Option } from "../../core/models";
import {
  ActionService,
  CommonService,
  DialogService
} from "../../core/services";
import { LogicalOperatorEnum as loEnum } from "../../core/enums";

/**
 * Component of DataTable
 *
 * @alpha
 */
@Component({
  selector: "nui-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnChanges {
  searchableFields: Field[];
  displayedControls: Control[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  selectedRows: any[] = [];
  logicalOperators: LogicalOperator[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("searchInput") searchInput: ElementRef;

  @Input() meta: any = [];
  @Input() data: any = [];
  @Input() fieldKey: string;

  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() refresh: EventEmitter<any> = new EventEmitter<any>();
  @Output() reload: EventEmitter<any> = new EventEmitter<any>();
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectMulti: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectAll: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() deselectAll: EventEmitter<any[]> = new EventEmitter<any[]>();

  private readonly ORDER_NO: string = "controlOrderNo";
  private readonly KEY_ACTION: string = "keyup";

  constructor(
    private actionService: ActionService,
    private commonService: CommonService,
    private dialogService: DialogService
  ) {}

  ngOnChanges() {
    // Metafields
    if (this.meta) {
      this.displayedControls = this.actionService.sort(
        this.meta.filter((c: Control) => c.controlVisible),
        this.ORDER_NO,
        true
      );

      this.displayedColumns = this.displayedControls.map(c => c.field.fieldId);
      this.displayedColumns = ["-select-", ...this.displayedColumns];
    }

    // Data
    if (this.data) {
      this.data = this.transformData(this.data);
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.onSearch();
    }
  }

  getRow(fieldId: string, row: any) {
    const arr = fieldId.split(".");
    if (arr.length > 1) {
      row = row[arr[0]];
      this.getRow(arr[0], row);
    }
    return row[arr[arr.length - 1]];
  }

  getValueLabel(fieldId: string, value: string): string {
    const meta = this.meta.find(
      m => m.field.fieldType === "select" && m.field.fieldId === fieldId
    );

    if (!meta) return value;

    const option: Option = meta.field.options.find(
      o => o.optionValue === value
    );
    if (!option) return;

    return option.optionLabel;
  }

  getFieldLabel(fieldLabel: string, fieldLabelOverridden: string) {
    return fieldLabelOverridden != null && fieldLabelOverridden.trim() !== ""
      ? fieldLabelOverridden
      : fieldLabel;
  }

  isRowSelected(dataRow: any): boolean {
    return this.selectedRows.find(
      dr => dr[this.fieldKey] === dataRow[this.fieldKey]
    );
  }

  isAllSelected(): boolean {
    return this.selectedRows.length === this.data.length;
  }

  transformData(data: any): any {
    let _data = [];
    data.map(dr => {
      let objParent = {};
      let objChild = {};
      Object.keys(dr).map(pkey => {
        let arr = [];
        if (dr[pkey] && typeof dr[pkey] === "object") {
          arr = Object.keys(dr[pkey]).map(ckey => {
            objChild = { ...objChild, [`${ckey}`]: dr[pkey][ckey] };
          });
        } else {
          objParent = { ...objParent, [`${pkey}`]: dr[pkey] };
        }
      });
      _data = [..._data, Object.assign({}, objParent, objChild)];
    });
    return _data;
  }

  onAdd() {
    this.add.emit();
  }

  onDelete() {
    this.dialogService
      .openDialog({
        data: {
          title: "Delete",
          content: "Confirm?",
          dialogButton: "YES_CANCEL",
          color: "warn"
        }
      })
      .subscribe(res => {
        this.delete.emit(res === "YES" ? this.selectedRows : null);
        this.selectedRows = [];
      });
  }

  onRefresh() {
    this.refresh.emit();
  }

  onReload() {
    this.reload.emit();
  }

  onSearch() {
    fromEvent(this.searchInput.nativeElement, this.KEY_ACTION).subscribe(() => {
      const searchStr: string = this.searchInput.nativeElement.value;
      this.dataSource.filter = searchStr.trim().toLowerCase();
    });
  }

  onSelectRow(dataRow: any, isChecked: boolean) {
    this.selectedRows = [];
    this.selectedRows = [...this.selectedRows, dataRow];
    this.select.emit(this.selectedRows);
  }

  onSelectMultiRows(dataRow: any, isChecked: boolean) {
    if (isChecked) {
      this.selectedRows = [...this.selectedRows, dataRow];
    } else {
      this.selectedRows = this.selectedRows.filter(dr => dr !== dataRow);
    }
    this.selectMulti.emit(this.selectedRows);
  }

  onSelectAllRows(isChecked: boolean): void {
    if (isChecked) {
      this.selectedRows = this.dataSource.filteredData;
    } else {
      this.onDeselectAllRows();
    }
    this.selectAll.emit(this.selectedRows);
  }

  onDeselectAllRows(): void {
    this.selectedRows = [];
    this.deselectAll.emit(this.selectedRows);
  }
}
