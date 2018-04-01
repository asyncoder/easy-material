import { Component, ViewChild, OnInit, AfterViewInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { ExampleService } from "../example.service";
import { MatSidenav } from "@angular/material";
import { FormGroup } from "@angular/forms";
import { DataFormComponent } from "../../modules/data-form/components/data-form.component";

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

  constructor(private exService: ExampleService) {}

  ngOnInit() {
    this.loadMeta();
    this.refreshTable();
  }

  private refreshTable() {
    this.dataTable$ = this.exService.getData("Customers");
  }

  private loadMeta() {
    this.metaTable$ = this.exService.getData("Sections(1)?$expand=controls");
    this.metaForm$ = this.exService.getData(
      "Panels(2)?$expand=sections($expand=controls)"
    );
  }

  private onSuccess(res) {
    this.onCancel(this.dataForm.formGroup);
    this.refreshTable();
  }

  private onError(err) {
    console.log("ERR", err.statusText);
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

  onAdd(event) {
    this.dataForm$ = of(null);
    this.sidenav.open();
  }

  onDelete(event) {
    console.log(event);
  }

  onRefresh(event) {
    this.refreshTable();
  }

  onReload(event) {
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
    console.log(event);
  }

  onSelectAll(event) {
    console.log(event);
  }

  onDeselectAll(event) {
    console.log(event);
  }

  onSave(data: any) {
    console.log(this.dataForm.formGroup);

    if (data.key == 0) this.add(data);
    if (data.key != 0) this.update(data.key, data);
  }

  onCancel(form: FormGroup) {
    form.reset();
    this.sidenav.close();
  }
}
