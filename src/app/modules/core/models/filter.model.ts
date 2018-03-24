import { FilterCondition } from "./filter-condition.model";

export class Filter {
    key: number;
    id: string;
    label: string;
    orderNo: number;
    filterConditions: FilterCondition[];
}