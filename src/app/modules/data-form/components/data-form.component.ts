/**
 * @license
 * Copyright Omar Amrani. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license
 */
import {
  Component,
  Input,
  Output,
  OnChanges,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Field, Section, Control } from "../../core/models";
import { ActionService } from "../../core/services";

/**
 * Component of DataForm
 *
 * @alpha
 */
@Component({
  selector: "nui-data-form",
  templateUrl: "./data-form.component.html",
  styleUrls: ["./data-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataFormComponent implements OnChanges {
  formGroup: FormGroup;
  sections: Section[] = [];

  @Input() meta: any = [];
  @Input() data: any = [];
  @Input() fieldKey: string;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  private readonly ORDER_NO: string = "fieldOrderNo";
  //private readonly KEY: string = "key";

  constructor(public fb: FormBuilder, public actionService: ActionService) {}

  ngOnChanges() {
    if (this.meta) {
      if (!this.data) {
        let data: any = {};
        let columns: any = [];
        columns = this.meta.sections.map((s: Section) =>
          s.controls.map(c => c.field.fieldId)
        );

        columns = []
          .concat(...columns)
          .forEach((el: string) => (data[el] = el === this.fieldKey ? 0 : ""));

        this.data = data;
      }
      this.formGroup = this.fb.group(this.data);
    }
  }

  displayedControls(section: Section): Control[] {
    return this.actionService.sort(
      section.controls.filter(c => c.controlVisible),
      this.ORDER_NO,
      true
    );
  }

  onSave() {
    let data = this.formGroup.value;
    if (!data[this.fieldKey]) data[this.fieldKey] = 0;
    this.save.emit(data);
  }

  onCancel() {
    this.cancel.emit(this.formGroup);
  }
}
