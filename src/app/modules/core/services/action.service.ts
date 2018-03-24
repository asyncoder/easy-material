import { Injectable } from "@angular/core";
import {
  LogicalOperatorEnum as loEnum,
  LogicalOperatorEnum
} from "../enums/logical-operator.enum";

/**
 * Action Service
 */
@Injectable()
export class ActionService {
  constructor() {}

  sort(data: any[], fieldName: string, sortAsc: boolean) {
    let reverse = sortAsc ? 1 : -1;

    return data.slice().sort((a, b) => {
      if (a[fieldName] < b[fieldName]) {
        return -reverse;
      } else if (b[fieldName] < a[fieldName]) {
        return reverse;
      } else {
        return 0;
      }
    });
  }

  search(
    data: any[],
    searchBy: string,
    searchInput: string,
    searchOperator: string
  ) {
    console.log(data);

    if (!searchInput) return data;

    return data.filter((dr: any) => {
      let searchStr: string = dr[searchBy].toLowerCase();

      switch (searchOperator) {
        case loEnum.equals:
          return searchStr === searchInput;

        case loEnum.contains:
          return searchStr.match(searchInput);

        case loEnum.lessThan:
          return searchStr < searchInput;

        case loEnum.lessThanOrEquals:
          return searchStr <= searchInput;

        case loEnum.greaterThan:
          return searchStr > searchInput;

        case loEnum.greaterThanOrEquals:
          return searchStr >= searchInput;

        case loEnum.in:
          return searchInput.split(",").indexOf(searchStr) !== -1;
      }
    });
  }
}
