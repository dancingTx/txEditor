import { query, type DomQuery } from "@/shared";
import i18n from "@/locale";
import { ThemeVars, I18nVars } from "@/config/default";
import type {
  Theme,
  I18n,
  Setting,
  GlobalCommandItem,
  GlobalCommandOption,
} from "@/@types";

const orderMap: Record<Setting, string> = {
  Theme: "switchTheme",
  I18n: "switchI18n",
};
export class GlobalCommand {
  private commandId!: string;
  private command!: Setting;
  private commandInfo!: GlobalCommandItem;
  private el?: DomQuery;
  static instance: GlobalCommand;
  constructor(
    command?: Setting,
    commandInfo?: GlobalCommandItem,
    options: GlobalCommandOption = {}
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
    commandInfo: GlobalCommandItem,
    options: GlobalCommandOption = {}
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
