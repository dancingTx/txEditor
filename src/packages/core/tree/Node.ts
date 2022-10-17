import { h } from "vue";
import { makeUUID } from "@/shared/variables";
import { NodeStatusVars, type NodeStatus } from "@/config/default";
import styles from "@/style/module/file.module.scss";

interface TreeNodeOptions {
  readonly?: boolean;
  isModified?: boolean;
  isDeleted?: boolean;
  isMoved?: boolean;
  isActived?: boolean;
}
interface NodeValue {
  uid?: string;
  kind: NodeStatus;
  icon?: string;
  label?: string;
  subTitle?: string;
  enLabel?: string;
  enSubTitle?: string;
}
type NodeType = "dir" | "node";
export default class TreeNode {
  public uid: string;
  public type: NodeType;
  public value: NodeValue;
  public options?: TreeNodeOptions;
  public active: boolean;
  public children?: TreeNode[];

  constructor(
    type: NodeType,
    value: NodeValue,
    children?: TreeNode[],
    options: TreeNodeOptions = {}
  ) {
    this.uid = value.uid || makeUUID();
    this.type = type;
    this.value = value;
    this.children = children;
    this.options = options;
    this.active = options.isActived || false;
  }

  renderNode(node?: NodeValue) {
    node = node || this.value;
    const nodeStatus = NodeStatusVars[node.kind];
    const domId = `node_${node.uid || this.uid}`;
    return node.label
      ? h(
          "div",
          {
            id: domId,
            class: [styles[nodeStatus]],
          },
          [node.label]
        )
      : h("input", {
          id: domId,
          class: styles.is_unknown_input,
          autofocus: "autofocus",
          onChange: (evt: InputEvent) => {
            this.value.label = (evt.target as any).value;
          },
          onBlur: (evt: FocusEvent) => {
            if (this.value.label) {
              this.renderNode();
            } else {
              const el = evt.target as HTMLElement;
              if (el.parentNode) {
                el.parentNode.removeChild(el);
              }
            }
          },
        });
  }
}
