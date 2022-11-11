import type { ExtraProps, Props } from "./core";
import type { SvgIconsKind } from "./icons";
import type { NodeDirOp, NodeStatus } from "./var";
import type TreeNodeList from "@/packages/core/tree/NodeList";

export interface NodeDirOpProps extends ExtraProps {
  command: NodeDirOp;
}

export interface TreeNodeOptions {
  readonly?: boolean;
  isModified?: boolean;
  isDeleted?: boolean;
  isMoved?: boolean;
}

export interface NodeValue extends Partial<ExtraProps> {
  kind: NodeStatus;
  rawLabel?: string;
}

export type NodeType = "dir" | "node";

export interface NodeInfo extends Props {
  active: boolean;
  type: NodeType;
  raw: TreeNode;
  evt?: Event;
}

export interface KnownNodeOptions {
  domId: string;
  iconClass: SvgIconsKind;
  isNode: boolean;
  nodeStatus: string;
}

export type UnknownNodeOptions = Pick<KnownNodeOptions, "domId" | "iconClass">;

export interface TreeNodeInfo {
  raw: TreeNodeList;
  id: string;
}
