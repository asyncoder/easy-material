import { Component, ViewChild, OnInit, AfterViewInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { ExampleService } from "../example.service";
import { MatSidenav } from "@angular/material";
import { FormGroup } from "@angular/forms";
import { DataFormComponent } from "../../modules/data-form/components/data-form.component";
import { DialogService } from "../../modules/core/services";

@Component({
  selector: "example01",
  templateUrl: "example01.component.html",
  styleUrls: ["example01.component.scss"]
})
export class Example01Component implements OnInit {
  metaTable$: Observable<any>;
  dataTable$: Observable<any>;
  metaForm$: Observable<any>;
  dataForm$: Observable<any>;

  @ViewChild("sidenav") sidenav: MatSidenav;
  @ViewChild("dataForm") dataForm: DataFormComponent;

  constructor(
    private exService: ExampleService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.onReload(null);
  }

  private loadMeta() {
    this.metaTable$ = this.exService.getData("Sections(1)?$expand=controls");

    this.metaForm$ = this.exService.getData(
      "Panels(2)?$expand=sections($expand=controls)"
    );
  }

  private refreshTable() {
    this.dataTable$ = this.exService.getData("Customers");
  }

  private onSuccess(res) {
    this.sidenav.close();
    this.refreshTable();
  }

  private onError(err) {
    this.dialogService.openDialog({
      data: {
        title: `Oops: ${err.statusText}`,
        content: `An error has been occured, please contact your administrator and retry again.`,
        dialogButton: "OK",
        color: "warn"
      }
    });
  }

  private add(payload: any) {
    this.exService
      .addItem("Customers", payload)
      .subscribe(res => this.onSuccess(res), err => this.onError(err));
  }

  private update(key: number, payload: any) {
    this.exService
      .updateItem(`Customers(${key})`, payload)
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
        this.exService
          .deleteItem(`Customers(${row.key})`)
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
