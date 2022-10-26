import {
  ThemeVars,
  I18nVars,
  type Setting,
  type CommandGroupItem,
  type Theme,
  type I18n,
} from "@/config/default";
import { query, type DomQuery } from "@/shared/domOp";
import i18n from "@/locale";
interface Options {
  el?: DomQuery;
}
const orderMap: Record<Setting, string> = {
  Theme: "switchTheme",
  I18n: "switchI18n",
};
export class GlobalCommand {
  private commandId!: string;
  private command!: Setting;
  private commandInfo!: CommandGroupItem;
  private el?: DomQuery;
  static instance: GlobalCommand;
  constructor(
    command?: Setting,
    commandInfo?: CommandGroupItem,
    options: Options = {}
  ) {
    if (command && commandInfo) {
      this.invokeCommand(command, commandInfo, options);
    }
  }
  static getInstance() {
    return (
      GlobalCommand.instance || (GlobalCommand.instance = new GlobalCommand())
    );
  }

  invokeCommand(
    command: Setting,
    commandInfo: CommandGroupItem,
    options: Options = {}
  ) {
    this.commandId = commandInfo.uid;
    this.command = command;
    this.commandInfo = commandInfo;
    this.el = query(options.el || "#app");

    return this;
  }
  execute() {
    (this as Record<string, any>)[orderMap[this.command]]();
  }

  private switchTheme() {
    (this.el as HTMLElement).setAttribute(
      "data-theme",
      ThemeVars[this.commandInfo.kind as Theme]
    );
  }
  private switchI18n() {
    i18n.global.locale.value = I18nVars[this.commandInfo.kind as I18n];
  }
}

export class CanvasCommand {}
