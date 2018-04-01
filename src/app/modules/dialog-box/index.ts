import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material";

import { DialogBoxComponent } from "./components";
import { DialogService } from "../core/services";

@NgModule({
  imports: [CommonModule, MatButtonModule],
  entryComponents: [DialogBoxComponent],
  declarations: [DialogBoxComponent],
  exports: [DialogBoxComponent],
  providers: [DialogService]
})
export class DialogBoxModule {}
