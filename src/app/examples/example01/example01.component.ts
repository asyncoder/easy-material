import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { ExampleService } from "../example.service";

@Component({
  selector: "example01",
  templateUrl: "example01.component.html",
  styleUrls: ["example01.component.scss"]
})
export class Example01Component {
  metaTable$: Observable<any>;
  dataTable$: Observable<any>;
  metaForm$: Observable<any>;
  dataForm$: Observable<any>;

  constructor(private exService: ExampleService) {}

  ngOnInit() {
    this._loadMeta();
    this._refreshTable();
  }

  private _refreshTable() {
    this.dataTable$ = this.exService.getData("Customers");
  }

  private _refreshForm(key: number) {
    if (key === 0) this.dataForm$ = of(null);
    else this.dataForm$ = this.exService.getData(`Customers(${key})`);
  }

  private _loadMeta() {
    this.metaTable$ = this.exService.getData("Sections(1)?$expand=controls");
    this.metaForm$ = this.exService.getData(
      "Panels(2)?$expand=sections($expand=controls)"
    );
  }

  private _add(payload: any) {
    this.exService.addItem("Customers", payload).subscribe(
      res => {
        this._refreshTable();
        this._refreshForm(0);
      },
      err => console.log(err)
    );
  }

  private _update(key: number, payload: any) {
    this.exService
      .updateItem(`Customers(${key})`, payload)
      .subscribe(res => this._refreshTable(), err => console.log(err));
  }

  onAdd(event) {
    this._refreshForm(0);
  }

  onDelete(event) {
    console.log(event);
  }

  onRefresh(event) {
    this._refreshTable();
  }

  onReload(event) {
    this._loadMeta();
    this._refreshTable();
  }

  onSelect(event) {
    if (event.length > 0) {
      let key = event[0].key;
      this._refreshForm(key);
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

  onSave(event) {
    if (event.key === 0) this._add(event);
    else this._update(event.key, event);
  }

  onCancel(event) {
    // console.log(event);
  }
}
