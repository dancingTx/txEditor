import type { App, DirectiveBinding, VNode } from "vue";
import { clickOutside, type ClickOutsideEl } from "../clickoutside";
import ContextMenu from "./contextMenu";
const context = "__context_menu__";
type ContextMenuEl = ClickOutsideEl & Record<string, ContextMenu>;
export const contextMenu = {
  mounted(el: ContextMenuEl, binding: DirectiveBinding, vnode: VNode) {
    const contextMenu = new ContextMenu(binding.value);
    contextMenu.setInnerDomTarget(el);
    el[context] = contextMenu;
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

  updated(el: ContextMenuEl, binding: DirectiveBinding, vnode: VNode) {
    clickOutside.updated(el, binding, vnode);
  },

  beforeUnmount(el: ContextMenuEl) {
    clickOutside.beforeUnmount(el);
    if (el[context]) {
      el[context].destroy();
    }
  },
};
export default (app: App) => app.directive("contextmenu", contextMenu);
