import type { ComponentPublicInstance, HTMLAttributes } from "vue";
import { MarkLineVars } from "@/config/var";

export interface Direction {
  isDownward: boolean;
  isRightward: boolean;
}
export type RefIns = ComponentPublicInstance | HTMLAttributes | Element | null;

export interface ConditionItem {
  isNearly: boolean;
  lineNode: RefIns;
  line: MarkLineVars;
  dragOffset: number;
  lineOffset: number;
}

export interface ConditionGroup {
  left: ConditionItem[];
  top: ConditionItem[];
}

export type LineStatus = Record<MarkLineVars, boolean>;

export type LineRefs = Map<MarkLineVars, RefIns>;

export interface MarkLineState {
  gap: number;
  lineStatus: LineStatus;
}
