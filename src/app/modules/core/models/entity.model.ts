import { Panel } from "./panel.model";

export interface Entity {
  entityKey: number;
  entityId: string;
  panels: Panel[];
}
