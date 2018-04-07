import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatInputModule,
  MatTabsModule,
  MatDatepickerModule,
  MatSelectModule,
  MatButtonModule,
  MatNativeDateModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";

import { DataFormComponent } from "./components/data-form.component";
import { ActionService } from "../core/services";
import { SortPipe } from "../core/pipes";

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  entryComponents: [DataFormComponent],
  declarations: [DataFormComponent, SortPipe],
  exports: [DataFormComponent],
  providers: [ActionService]
})
export class DataFormModule {}
