import { h, Fragment, type VNode } from "vue";
import {
  DefaultVars,
  Vars,
  type NormalCanvasCommand,
  type SpecialCanvasCommand,
} from "@/config/default";
import { makeUUID } from "@/shared/variables";
import styles from "@/style/module/components.module.scss";

export default class Canvas {
  public uid: string;

  constructor(uid?: string) {
    this.uid = uid || makeUUID();
  }

  private renderGird(slot: VNode) {
    const renderLine = (count: number, type: string) => {
      return h(
        "ul",
        {
          class: styles[`canvas_grid_${type}`],
        },
        new Array(count).fill("").map(() =>
          h("li", {
            class: styles[`canvas_grid_${type}__item`],
          })
        )
      );
    };
    const renderRow = (count: number) => renderLine(count, "row");
    const renderColumn = (count: number) => renderLine(count, "column");
    const [columnNum, rowNum] = DefaultVars.__CANVAS_RATIO__
      .split(":")
      .map(Number);
    return h(Fragment, [
      renderRow(rowNum * Vars.__AMPLIFICATION__),
      renderColumn(columnNum * Vars.__AMPLIFICATION__),
      h("div", { class: styles.canvas_grid_slot }, slot),
    ]);
  }

  private renderPreview(slot: VNode) {
    return h("div", null, [h("div", [1111, slot])]);
  }

  private executeCommand2Vnode(slot: VNode, type: NormalCanvasCommand) {
    return slot;
  }

  private renderRawContent(content?: VNode): VNode {
    return content || h("div");
  }

  render(
    type?: NormalCanvasCommand,
    inherent?: SpecialCanvasCommand[],
    content?: VNode
  ) {
    let slot = this.renderRawContent(content);

    if (inherent && inherent.length) {
      for (let i = 0, len = inherent.length; i < len; i++) {
        slot = (this as any)[`render${inherent[i]}`](slot);
      }
    }

    if (type) {
      slot = this.executeCommand2Vnode(slot, type);
    }

    return slot;
  }
}
