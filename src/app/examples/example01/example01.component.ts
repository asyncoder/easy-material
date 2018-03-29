import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
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
    this.dataForm$ = this.exService.getData(`Customers(${key})`);
    console.log(this.dataForm$);
  }

  private _loadMeta() {
    this.metaTable$ = this.exService.getData("Sections(1)?$expand=controls");
    this.metaForm$ = this.exService.getData(
      "Panels(2)?$expand=sections($expand=controls)"
    );
  }

  onAdd(event) {
    console.log(event);
  }

  onDelete(event) {
    console.log(event);
  }

  onRefresh(event) {
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

  onSubmit(event) {
    console.log(event);
  }

  onCancel(event) {
    //console.log(event);
  }
}
