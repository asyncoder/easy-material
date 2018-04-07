import { Panel } from "./panel.model";
import { Control } from "./control.model";

export interface Section {
  sectionKey: number;
  sectionId: string;
  sectionLabel: string;
  panel: Panel;
  panelKey: number;
  controls: Control[];
}
