import { Field } from "./field.model";

export interface Meta {
    key: number;
    orderNo: number;
    isVisible: boolean;
    isRequired: boolean;
    isSearchable: boolean;    
    field: Field;
}