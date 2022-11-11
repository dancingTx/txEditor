import type { PickOptional, ExtraProps } from "./core";
import type { Theme, I18n, CanvasCommand } from "./var";
import type { CanvasData } from "./canvas";
import type { DomQuery } from "@/shared";

export type GlobalCommandKind = Theme | I18n;

export interface GlobalCommandItem extends PickOptional<ExtraProps, "icon"> {
  kind: GlobalCommandKind;
  color?: string;
}

export interface GlobalCommandGroup
  extends PickOptional<ExtraProps, "icon" | "label"> {
  group: string;
  children: CommandGroupItem[];
}
export interface GlobalCommandOption {
  el?: DomQuery;
}

export type SpecialCanvasCommand = "Preview" | "Gird";

export type NormalCanvasCommand = Exclude<CanvasCommand, SpecialCanvasCommand>;

export interface CanvasCommandData extends CanvasData {
  isActiveScreenSize: string;
  isManual: boolean;
}
