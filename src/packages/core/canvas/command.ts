import { makeUUID } from "@/shared/variables";
import type {
  CanvasCommand as Command,
  NormalCanvasCommand,
  SpecialCanvasCommand,
} from "@/config/default";
import bus from "@/shared/bus";

const selects: SpecialCanvasCommand[] = ["Gird", "Preview"];
const isSpecialCommand = (command: Command): command is SpecialCanvasCommand =>
  selects.indexOf(command as SpecialCanvasCommand) !== -1;

export default class CanvasCommand {
  public uid?: string;
  public command: NormalCanvasCommand;
  public canSelected: SpecialCanvasCommand[];

  constructor(uid?: string) {
    this.uid = uid || makeUUID();
    this.command = "" as NormalCanvasCommand;
    this.canSelected = [];
  }

  private toggleSpecialCommand(command: SpecialCanvasCommand) {
    let i = 0;
    let len = this.canSelected.length;
    for (; i < len; i++) {
      const item = this.canSelected[i];
      if (item === command) {
        this.canSelected.splice(i, 1);
        break;
      }
    }
    if (i === len) {
      this.canSelected.push(command);
    }
    bus.emit("canvasCommand:canSelected", this.canSelected);
  }

  invoke(command: Command) {
    if (isSpecialCommand(command)) {
      this.toggleSpecialCommand(command);
    } else {
      this.command = command;
      bus.emit("canvasCommand:command", this.command);
    }
  }
}
