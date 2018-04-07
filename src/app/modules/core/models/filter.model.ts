import { FilterCondition } from "./filter-condition.model";

export class Filter {
  filterKey: number;
  filterId: string;
  filterLabel: string;
  filterOrderNo: number;
  filterConditions: FilterCondition[];
}
