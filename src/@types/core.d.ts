import type { SvgIconsKind } from "./icons";

export type PartialOptional<T, K extends keyof T> = { [P in K]?: T[P] };

export type PickOptional<T, K extends keyof T> = PartialOptional<T, K> &
  Omit<T, K>;

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
