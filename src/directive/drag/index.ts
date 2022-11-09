import type { App, DirectiveBinding } from "vue";
import DragSplit from "./dragSplit";
import styles from "@/style/module/components.module.scss";

let globalDragSplit: DragSplit;

export const dragDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const dragSplit = new DragSplit(el, binding.value);
    globalDragSplit = dragSplit;
    const dragSplitDom = dragSplit.create(styles.drag_split);
    dragSplit.setInnerDomTarget(dragSplitDom);
    const { horizontal, vertical } = binding.modifiers;
    if (horizontal || vertical) {
      dragSplit.switchState(horizontal ? "horizontal" : "vertical");
    }
    dragSplit.execute();
  },
  beforeUnmount() {
    if (globalDragSplit && globalDragSplit instanceof DragSplit) {
      globalDragSplit.destory();
    }
  },
};
export default (app: App) => app.directive("drag", dragDirective);
