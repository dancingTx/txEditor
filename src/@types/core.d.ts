import type { SvgIconsKind } from "./icons";
export interface Props {
  uid: string;
}

export interface ExtraProps extends Props {
  icon: SvgIconsKind;
  label: string;
  i18n: string;
}
export interface ExtraPropsEn extends ExtraProps {
  enLabel: string;
}
