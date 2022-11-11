import type { PickOptional, ExtraProps } from "./core";
import type { Widget } from "./var";

export interface WidgetProps extends PickOptional<ExtraProps, "i18n"> {
  command: Widget;
}
