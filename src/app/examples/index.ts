import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { MatSidenavModule } from "@angular/material";

import { DataTableModule } from "../modules/data-table";
import { DataFormModule } from "../modules/data-form";

import { CustomerComponent } from "./customer/customer.component";

import { DialogService } from "../modules/core/services";
import { DialogBoxModule } from "../modules/dialog-box";
import { DataEntityModule } from "../modules/data-entity";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatSidenavModule,
    DataEntityModule,
    DataTableModule,
    DataFormModule,
    DialogBoxModule
  ],
  exports: [CustomerComponent],
  declarations: [CustomerComponent],
  entryComponents: [],
  providers: [DialogService]
})
export class ExampleModule {}
