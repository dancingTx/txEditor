import { deepClone } from "@/shared/data";
import type { ExtraProps, ComponentInfo } from "@/@types";

export default class CanvasCommandManager {
  private records: ComponentInfo<ExtraProps>[][];
  private snapshotIndex: number;

  constructor() {
    this.records = [];
    this.snapshotIndex = -1;
  }

  setRecord(record: ComponentInfo<ExtraProps>[]) {
    this.records[++this.snapshotIndex] = deepClone(record);
    if (this.snapshotIndex < this.records.length - 1) {
      this.records = this.records.slice(0, this.snapshotIndex + 1);
    }
  }

  getCurrRecord() {
    return deepClone(this.records[this.snapshotIndex]) || [];
  }

  undo() {
    if (this.snapshotIndex < 0) return;
    this.snapshotIndex--;
  }
  redo() {
    if (this.snapshotIndex >= this.records.length - 1) return;
    this.snapshotIndex++;
  }
}
