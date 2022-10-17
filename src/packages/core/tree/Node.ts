interface TreeNodeOptions {
  readonly?: boolean;
  isModified?: boolean;
  isDeleted?: boolean;
  isMoved?: boolean;
}
export default class TreeNode {
  private type: string;
  private value: unknown;
  private options: TreeNodeOptions;
  constructor(type: string, value: unknown, options: TreeNodeOptions = {}) {
    this.type = type;
    this.value = value;
    this.options = options;
  }
}
