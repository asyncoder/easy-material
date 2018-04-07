import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  Input
} from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { MatSidenav } from "@angular/material";
import { FormGroup } from "@angular/forms";

import { DataFormComponent } from "../../data-form/components/data-form.component";
import { DialogService, DataService } from "../../core/services";

@Component({
  selector: "nui-data-entity",
  templateUrl: "data-entity.component.html",
  styleUrls: ["data-entity.component.scss"]
})
export class DataEntityComponent implements OnInit {
  metaTable$: Observable<any>;
  dataTable$: Observable<any>;
  metaForm$: Observable<any>;
  dataForm$: Observable<any>;

  @ViewChild("sidenav") sidenav: MatSidenav;
  @ViewChild("dataForm") dataForm: DataFormComponent;

  @Input() fieldKey: string;
  @Input() api: string;
  @Input() apiMetaTable: string;
  @Input() apiMetaForm: string;
  @Input() apiDataTable: string;

  constructor(
    private dataService: DataService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.onReload(null);
  }

  private loadMeta() {
    this.metaTable$ = this.dataService.getData(
      `${this.api}/${this.apiMetaTable}`
    );

    this.metaForm$ = this.dataService.getData(
      `${this.api}/${this.apiMetaForm}`
    );
  }

  private refreshTable() {
    this.dataTable$ = this.dataService.getData(
      `${this.api}/${this.apiDataTable}`
    );
  }

  private onSuccess(res) {
    this.sidenav.close();
    this.refreshTable();
  }

  private onError(err) {
    this.dialogService.openDialog({
      data: {
        title: `Oops: ${err.statusText}`,
        content: `An error has been occured, please retry again.`,
        dialogButton: "OK",
        color: "warn"
      }
    });
  }

  private add(payload: any) {
    this.dataService
      .addItem(`${this.api}/${this.apiDataTable}`, payload)
      .subscribe(res => this.onSuccess(res), err => this.onError(err));
  }

  private update(key: number, payload: any) {
    this.dataService
      .updateItem(`${this.api}/${this.apiDataTable}(${key})`, payload)
      .subscribe(res => this.onSuccess(res), err => this.onError(err));
  }

  onAdd(event: any) {
    this.dataForm$ = of(null);
    this.dataForm.formGroup.reset();
    this.sidenav.open();
  }

  onDelete(rows: any) {
    if (rows && rows.length > 0) {
      rows.forEach(row => {
        this.dataService
          .deleteItem(`${this.api}/${this.apiDataTable}(${row.key})`)
          .subscribe(res => this.onSuccess(res), err => this.onError(err));
      });
    }
  }

  onRefresh(event: any) {
    this.refreshTable();
  }

  onReload(event: any) {
    this.loadMeta();
    this.refreshTable();
  }

  onSelect(rows: any) {
    if (rows.length > 0) {
      this.dataForm$ = of(rows[0]);
      this.sidenav.open();
    }
  }

  onSelectMulti(event) {
    // console.log(event);
  }

  onSelectAll(event) {
    // console.log(event);
  }

  onDeselectAll(event) {
    // console.log(event);
  }

  onSave(data: any) {
    if (this.dataForm.formGroup.status === "VALID") {
      if (data.key == 0) this.add(data);
      if (data.key != 0) this.update(data.key, data);
    } else {
      this.dialogService.openDialog({
        data: {
          title: "Invalid form",
          content: "Please check all required fields",
          dialogButton: "OK",
          color: "warn"
        }
      });
    }
  }

  onCancel(form: FormGroup) {
    form.reset();
    this.sidenav.close();
  }
}
