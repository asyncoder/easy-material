import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { DataTableModule } from "../modules/data-table";

import { ExampleDataTableComponent } from "./data-table/example-data-table.component";
import { ExampleService } from "./example.service";

@NgModule({
  imports: [CommonModule, HttpClientModule, DataTableModule],
  exports: [ExampleDataTableComponent],
  declarations: [ExampleDataTableComponent],
  providers: [ExampleService]
})
export class ExampleModule {}
