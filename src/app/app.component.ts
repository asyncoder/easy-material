import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
// import { MatDialog, MatSnackBar } from '@angular/material';
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
// import 'rxjs/add/operator/filter';

// import { DataService } from "./data.service";
// import { DialogService } from "./modules/core/services";
// import { DialogButtonsEnum } from "./modules/core/enums";

import { meta, data, filters } from "./mock-data";
import { AppService } from "./app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  meta$: Observable<any>;
  data$: Observable<any>;

  meta: any;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.meta$ = this.appService.getMeta(); //of(meta);
    this.data$ = this.appService.getData(); //of(data);
  }

  onAdd(event) {
    console.log(event);
  }

  onDelete(event) {
    console.log(event);
  }

  onRefresh(event) {
    this.meta$ = this.appService.getMeta();
    this.data$ = this.appService.getData();
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
