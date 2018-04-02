import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { MatSidenavModule } from "@angular/material";

import { DataTableModule } from "../data-table";
import { DataFormModule } from "../data-form";
import { DialogBoxModule } from "../dialog-box";

import { DataService } from "../core/services/data.service";
import { DialogService } from "../core/services";

import { DataEntityComponent } from "../data-entity/components/data-entity.component";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatSidenavModule,
    DataTableModule,
    DataFormModule,
    DialogBoxModule
  ],
  exports: [DataEntityComponent],
  declarations: [DataEntityComponent],
  entryComponents: [],
  providers: [DataService, DialogService]
})
export class DataEntityModule {}
