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
  OnInit,
  AfterViewInit,
  Output
} from "@angular/core";

import { DataSource } from "@angular/cdk/collections";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

import { Observable } from "rxjs/Observable";
//import { of } from "rxjs/observable/of";
//import { merge } from "rxjs/observable/merge";
import { fromEvent } from "rxjs/observable/fromEvent";
import { map } from "rxjs/operator/map";
//import { debounceTime } from "rxjs/operator/debounceTime";
//import { distinctUntilChanged } from "rxjs/operator/distinctUntilChanged";

import { Meta, Field, LOV, Filter, LogicalOperator } from "../../core/models";
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
  styleUrls: ["./data-table.component.scss"]
})
export class DataTableComponent implements OnInit, AfterViewInit {
  searchableFields: Field[];
  displayedFields: Field[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  selectedRows: any[] = [];
  logicalOperators: LogicalOperator[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("searchInput") searchInput: ElementRef;

  @Input() meta: Meta[] = [];
  @Input() data: any[] = [];
  //@Input() filters: Filter[] = [];
  //@Input() selectedSearchByFieldId: string;
  //@Input() selectedLogicalOperatorId: string;
  //@Input() selectedFilterId: string;

  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  @Output() select: EventEmitter<any[]> = new EventEmitter<any[]>();

  private readonly ORDER_NO: string = "OrderNo";
  private readonly KEY_ACTION: string = "keyup";

  constructor(
    private actionService: ActionService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    // this.logicalOperators = this.commonService.LogicalOperators;

    // this.searchableFields = this.meta
    //   .filter(m => m.isSearchable)
    //   .map(m => m.field);

    // Metafields
    this.displayedFields = this.actionService
      .sort(this.meta.filter(m => m.isVisible), this.ORDER_NO, true)
      .map(m => m.field);

    this.displayedColumns = this.displayedFields.map(f => f.id);
    this.displayedColumns = ["-select-", ...this.displayedColumns];

    // Data
    this.dataSource = new MatTableDataSource(this.data);

    this.onSearch();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onAdd() {
    this.add.emit({});
  }

  onSearch() {
    fromEvent(this.searchInput.nativeElement, this.KEY_ACTION).subscribe(() => {
      const searchStr: string = this.searchInput.nativeElement.value;
      this.dataSource.filter = searchStr.trim().toLowerCase();
    });
  }

  onSelectRow(dataRow: any, isChecked: boolean) {
    if (isChecked) {
      this.selectedRows = [...this.selectedRows, dataRow];
    } else {
      this.selectedRows = this.selectedRows.filter(dr => dr !== dataRow);
    }
    this.select.emit(this.selectedRows);
  }

  onSelectAllPageRows(isChecked: boolean): void {
    if (isChecked) {
      this.selectedRows = this.dataSource.filteredData;
    } else {
      this.onDeselectAllPageRows();
    }
  }

  onDeselectAllPageRows(): void {
    this.selectedRows = [];
  }

  isRowSelected(dataRow: any): boolean {
    return this.selectedRows.find(dr => dr === dataRow);
  }
}

/*

data = this.actionService.search(
        this._data,
        this.searchBy,
        this.searchInput,
        this.searchOperator
      );

      data = this.actionService.sort(
        data,
        this._sort.active,
        this._sort.direction == "asc"
      );

*/
