import { Entity } from "./entity.model";
import { Section } from "./section.model";

export interface Panel {
  panelKey: number;
  panelId: string;
  entity: Entity;
  entityKey: number;
  sections: Section[];
}
