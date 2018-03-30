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
import { FormBuilder, FormGroup } from "@angular/forms";

import { Field, Section } from "../../core/models";
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

  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  private readonly ORDER_NO: string = "OrderNo";

  constructor(public fb: FormBuilder, public actionService: ActionService) {}

  ngOnChanges() {
    if (this.meta) {
      if (!this.data) {
        let data: any = {};
        let fields = this.meta.sections.map(s =>
          s.controls.map(c => c.field.id)
        );
        fields = [].concat(...fields).forEach(el => (data[el] = ""));
        this.data = data;
      }
      this.formGroup = this.fb.group(this.data);
    }
  }

  displayedFields(section: Section): Field[] {
    return this.actionService
      .sort(section.controls.filter(m => m.isVisible), this.ORDER_NO, true)
      .map(m => m.field);
  }

  onSubmit() {
    this.submit.emit(this.formGroup.value);
  }

  onCancel() {
    this.cancel.emit(this.formGroup.value);
  }
}
