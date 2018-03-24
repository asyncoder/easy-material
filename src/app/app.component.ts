import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
// import { MatDialog, MatSnackBar } from '@angular/material';
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
// import 'rxjs/add/operator/filter';

// import { DataService } from "./data.service";
// import { DialogService } from "./modules/core/services";
// import { DialogButtonsEnum } from "./modules/core/enums";

import { meta, data, filters } from "./mock-data";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  meta$: Observable<any>;
  data$: Observable<any>;
  filters$: Observable<any>;

  constructor() {}

  ngOnInit() {
    this.meta$ = of(meta);
    this.data$ = of(data);
    this.filters$ = of(filters);
  }

  onAdd(event) {
    console.log(event);
  }
}
