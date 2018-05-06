import { Field, Section, Lov } from ".";

export interface Control {
  controlKey: number;
  controlOrderNo: number;
  controlVisible: boolean;
  controlRequired: boolean;
  controlSearchable: boolean;
  fieldLabelOverridden: string;
  field: Field;
  fieldKey: number;
  lov: Lov;
  lovKey: number;
  section: Section;
  sectionKey: number;
}
