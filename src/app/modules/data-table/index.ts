import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatTooltipModule,
  MatCheckboxModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { DataTableComponent } from "./components";
import { ActionService, CommonService } from "../core/services";
import { FilterPipe } from "../core/pipes";
import { DialogBoxModule } from "../dialog-box";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatCheckboxModule,
    DialogBoxModule
  ],
  entryComponents: [],
  declarations: [DataTableComponent, FilterPipe],
  exports: [DataTableComponent],
  providers: [ActionService, CommonService]
})
export class DataTableModule {}
