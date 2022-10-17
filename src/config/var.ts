export const enum Vars {
  __MENU_WIDTH__ = 240,
  __MIN_WIDTH__ = 180,
  __MIN_HEIGHT__ = 120,
  __SPLIT_LINE_WIDTH__ = 4,
  __ASIDE_WIDTH__ = 48,
  __CANVAS_WIDTH__ = 800,
  __PANEL_WIDTH__ = 180,
}

export enum NodeStatusVars {
  Locked = "is_locked",
  Edited = "is_edited",
  Readonly = "is_readonly",
  Modify = "is_modify",
  Deleted = "is_deleted",
  Created = "is_created",
}

export const enum SettingVars {
  Theme = "theme",
  I18n = "i18n",
}
export const enum NodeVars {
  CreateNode = "createNode",
  RenameNode = "renameNode",
  MoveNode = "moveNode",
  DeleteNode = "deleteNode",
  CreateDir = "createDir",
  RenameDir = "renameDir",
  MoveDir = "moveDir",
  DeleteDir = "deleteDir",
}

export const enum WidgetVars {
  DarkMode = "darkMode",
  Collapse = "collapse",
}

export const enum CanvasCommandVars {
  Undo = "undo",
  Redo = "redo",
  Preview = "preview",
  Clear = "clear",
  Delete = "delete",
}

export const enum TagVars {
  Button = "button",
  Text = "text",
  Image = "image",
}

export const enum DarkModeVars {
  Light = "is_light",
  Dark = "is_dark",
}

export const enum I18nVars {
  English = "enUs",
  Chinese = "zhCn",
  HongKong = "zhHk",
}

export enum ThemeVars {
  LightDefault = "is_light_default",
  DarkDefault = "is_dark_default",
  LightBlue = "is_light_blue",
  DarkBlue = "is_dark_blue",
  LightRed = "is_light_red",
  DarkRed = "is_dark_red",
}
