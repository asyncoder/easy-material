import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { DataTableModule } from "../modules/data-table";
import { DataFormModule } from "../modules/data-form";

import { ExampleDataTableComponent } from "./example01/example-data-table.component";
import { ExampleDataFormComponent } from "./example01/example-data-form.component";
import { ExampleService } from "./example.service";
import { Example01Component } from "./example01/example01.component";
import { MatSidenavModule } from "@angular/material";
import { DialogService } from "../modules/core/services";
import { DialogBoxModule } from "../modules/dialog-box";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    DataTableModule,
    DataFormModule,
    MatSidenavModule,
    DialogBoxModule
  ],
  exports: [
    ExampleDataTableComponent,
    ExampleDataFormComponent,
    Example01Component
  ],
  declarations: [
    ExampleDataTableComponent,
    ExampleDataFormComponent,
    Example01Component
  ],
  entryComponents: [],
  providers: [ExampleService, DialogService]
})
export class ExampleModule {}
