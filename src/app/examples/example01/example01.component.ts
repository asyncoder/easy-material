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
    this._refresh();
  }

  private _refresh() {
    this.metaTable$ = this.exService.getData("Sections(1)?$expand=controls");
    this.dataTable$ = this.exService.getData("Customers");

    this.metaForm$ = this.exService.getData(
      "Panels(2)?$expand=sections($expand=controls)"
    );
    this.dataForm$ = this.exService.getData("Customers(6)");
  }

  onAdd(event) {
    console.log(event);
  }

  onDelete(event) {
    console.log(event);
  }

  onRefresh(event) {
    this._refresh();
  }

  onSelect(event) {
    console.log(event);
  }

  onSelectAll(event) {
    console.log(event);
  }

  onDeselectAll(event) {
    console.log(event);
  }
}
