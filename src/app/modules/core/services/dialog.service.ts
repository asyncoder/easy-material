import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs/observable";

import { DialogBoxComponent } from "../../dialog-box/components";

@Injectable()
export class DialogService {
    constructor(public dialog: MatDialog) { }

    openDialog(data: any): Observable<any> {
        return this.dialog
            .open(DialogBoxComponent, data)
            .afterClosed();            
    }
}