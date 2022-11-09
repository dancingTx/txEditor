import type { ComponentInfo, SourceProps } from "@/config/default";
import { deepClone } from "@/shared/data";

export default class CanvasCommandManager {
  private records: ComponentInfo<SourceProps>[][];
  private snapshotIndex: number;

  constructor() {
    this.records = [];
    this.snapshotIndex = -1;
  }

  setRecord(record: ComponentInfo<SourceProps>[]) {
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
