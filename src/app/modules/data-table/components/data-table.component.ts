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

import { Observable } from "rxjs/Observable";
import { fromEvent } from "rxjs/observable/fromEvent";
import { map } from "rxjs/operator/map";

import { Field, LOV, LogicalOperator, Option } from "../../core/models";
import { ActionService, CommonService } from "../../core/services";
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
  displayedFields: Field[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  selectedRows: any[] = [];
  logicalOperators: LogicalOperator[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("searchInput") searchInput: ElementRef;

  @Input() meta: any = [];
  @Input() data: any[] = [];

  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() refresh: EventEmitter<any> = new EventEmitter<any>();
  @Output() reload: EventEmitter<any> = new EventEmitter<any>();
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectMulti: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectAll: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() deselectAll: EventEmitter<any[]> = new EventEmitter<any[]>();

  private readonly ORDER_NO: string = "OrderNo";
  private readonly KEY_ACTION: string = "keyup";

  constructor(
    private actionService: ActionService,
    private commonService: CommonService
  ) {}

  ngOnChanges() {
    // Metafields
    if (this.meta) {
      this.displayedFields = this.actionService
        .sort(this.meta.filter(m => m.isVisible), this.ORDER_NO, true)
        .map(m => m.field);

      this.displayedColumns = this.displayedFields.map(f => f.id);
      this.displayedColumns = ["-select-", ...this.displayedColumns];
    }

    // Data
    if (this.data) {
      this.dataSource = new MatTableDataSource(this.data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.onSearch();
    }
  }

  getLabel(fieldId: string, value: string): string {
    const meta = this.meta.find(
      m => m.field.type === "select" && m.field.id === fieldId
    );
    if (!meta) return value;

    const option: Option = meta.field.options.find(o => o.value === value);
    if (!option) return;

    return option.label;
  }

  onAdd() {
    this.add.emit();
  }

  onDelete() {
    this.add.emit(this.selectedRows);
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

  isRowSelected(dataRow: any): boolean {
    return this.selectedRows.find(dr => dr.key === dataRow.key);
  }
}
