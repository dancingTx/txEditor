import type { App, DirectiveBinding, VNode } from "vue";
import { clickOutside } from "../clickoutside";
import ContextMenu from "./contextMenu";
const context = "__context_menu__";

export const contextMenu = {
  mounted(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    const contextMenu = new ContextMenu(binding.value);
    contextMenu.setInnerDomTarget(el);
    (el as any)[context] = contextMenu;
    contextMenu.execute();
    clickOutside.mounted(
      el,
      Object.assign({}, binding, {
        value: {
          handler() {
            contextMenu.hidePanel();
          },
        },
      }),
      vnode
    );
  },

  updated(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    clickOutside.updated(el, binding, vnode);
  },

  beforeUnmount(el: HTMLElement) {
    clickOutside.beforeUnmount(el);
    if ((el as any)[context]) {
      (el as any)[context].destroy();
    }
  },
};
export default (app: App) => app.directive("contextmenu", contextMenu);
