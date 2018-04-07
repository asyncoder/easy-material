import { Field } from "./field.model";
import { Section } from "./section.model";

export interface Control {
  controlKey: number;
  controlOrderNo: number;
  controlVisible: boolean;
  controlRequired: boolean;
  controlSearchable: boolean;
  field: Field;
  fieldKey: number;
  section: Section;
  sectionKey: number;
}
