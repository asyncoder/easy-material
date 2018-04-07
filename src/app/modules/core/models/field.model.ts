import { Entity } from "./entity.model";
import { Option } from "./option.model";
import { FieldTypeEnum } from "../enums";

export interface Field {
  fieldKey: number;
  fieldId: string;
  fieldLabel: string;
  fieldType: string;
  options: Option[];
  entity: Entity;
  entityKey: number;
}
