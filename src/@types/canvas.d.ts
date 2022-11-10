import type { ExtraProps } from "./core";
import type { CanvasItem } from "./var";

export interface CanvasData {
  canvasWidth: number;
  canvasHeight: number;
}

export interface CanvasSize extends ExtraProps {
  gte?: number;
  lt?: number;
}

export interface CanvasItemProps extends ExtraProps {
  command: CanvasItem;
}

export interface CanvasCommandProps extends ExtraProps {
  command: CanvasCommand;
}
