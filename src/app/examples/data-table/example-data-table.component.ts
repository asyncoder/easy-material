import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ExampleService } from "../example.service";

@Component({
  selector: "example-data-table",
  templateUrl: "example-data-table.component.html"
})
export class ExampleDataTableComponent implements OnInit {
  meta$: Observable<any>;
  data$: Observable<any>;

  constructor(private exService: ExampleService) {}

  ngOnInit() {
    this._refresh();
  }

  private _refresh() {
    this.meta$ = this.exService.getMeta();
    this.data$ = this.exService.getData();
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
