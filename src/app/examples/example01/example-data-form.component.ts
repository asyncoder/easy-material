import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ExampleService } from "../example.service";

@Component({
  selector: "example-data-form",
  templateUrl: "example-data-form.component.html"
})
export class ExampleDataFormComponent implements OnInit {
  meta$: Observable<any>;
  data$: Observable<any>;

  constructor(private exService: ExampleService) {}

  ngOnInit() {
    this._refresh();
  }

  private _refresh() {
    this.meta$ = this.exService.getData(
      "Panels(2)?$expand=sections($expand=controls)"
    );
    this.data$ = this.exService.getData("Customers(6)");
  }
}
