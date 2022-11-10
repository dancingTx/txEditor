import type { ExtraProps } from "./core";
import type { Widget } from "./var";

export interface WidgetProps extends ExtraProps {
  command: Widget;
}
