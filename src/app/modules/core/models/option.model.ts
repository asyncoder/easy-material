import { Field } from "./field.model";

export interface Option {
  optionKey: number;
  optionValue: any;
  optionLabel: string;
  field: Field;
  fieldKey: number;
}
