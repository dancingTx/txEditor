export default class CommandManager {
  private undoCommands: [];
  private redoCommands: [];

  constructor() {
    this.undoCommands = [];
    this.redoCommands = [];
  }
}
