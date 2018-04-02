import { Component, Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "nui-dialog-box",
  templateUrl: "./dialog-box.component.html",
  styleUrls: ["./dialog-box.component.scss"]
})
export class DialogBoxComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
