import { Injectable } from "@angular/core";
import { LogicalOperator, Field } from "../models";
import { LogicalOperatorEnum as loEnum } from "../enums";

@Injectable()
export class CommonService {
  constructor() {}

  private logicalOperators: LogicalOperator[] = [
    { key: 1, id: loEnum.equals, label: "Equals" },
    { key: 2, id: loEnum.contains, label: "Contains" },
    { key: 3, id: loEnum.in, label: "In" },
    { key: 4, id: loEnum.lessThan, label: "Less Than" },
    { key: 5, id: loEnum.lessThanOrEquals, label: "Less Than or Equals" },
    { key: 6, id: loEnum.greaterThan, label: "Greater Than" },
    { key: 7, id: loEnum.greaterThanOrEquals, label: "Greater Than or Equals" }
  ];

  get LogicalOperators(): LogicalOperator[] {
    return this.logicalOperators;
  }
}
