import type { App, DirectiveBinding, VNode } from "vue";
import { on, makeUUID } from "@/shared";

const nodeList: (HTMLElement & Record<string, any>)[] = [];
const ctx = "@@clickoutsideContext";
const uuid = makeUUID();
let startClick: MouseEvent;
let seed = 0;

interface Options {}

interface ValueProps extends Options {
  handler: (e?: Event) => void;
}

interface CtxProps {
  id?: number;
  documentHandler?: (e: MouseEvent, evt: MouseEvent) => void;
  methodName?: string;
  bindingFn?: (e?: Event) => void;
}

export type ClickOutsideEl = HTMLElement & Record<string, CtxProps>;

on(document, "mousedown", (e: Event) => (startClick = e as MouseEvent));

on(document, "mouseup", (e: Event) => {
  nodeList.forEach((node) => node[ctx].documentHandler(e, startClick));
});

function createDocumentHandler(
  el: ClickOutsideEl,
  binding: DirectiveBinding,
  vnode: VNode & Record<string, any>
) {
  return function (mouseup = {} as MouseEvent, mousedown = {} as MouseEvent) {
    if (
      !vnode ||
      !mouseup.target ||
      !mousedown.target ||
      el.contains(mouseup.target as Node) ||
      el.contains(mousedown.target as Node) ||
      el === mouseup.target
    ) {
      return;
    }

    if (uuid && el[ctx].methodName && vnode[el[ctx].methodName]) {
      vnode[el[ctx].methodName]();
    } else {
      typeof el[ctx].bindingFn === "function" && el[ctx].bindingFn();
    }
  };
}

/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
export const clickOutside = {
  mounted(el: ClickOutsideEl, binding: DirectiveBinding, vnode: VNode) {
    nodeList.push(el);
    const id = seed++;
    const { handler } = binding.value as ValueProps;
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: uuid,
      bindingFn: handler,
    };
  },

  updated(el: ClickOutsideEl, binding: DirectiveBinding, vnode: VNode) {
    const { handler } = binding.value as ValueProps;
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
    el[ctx].methodName = uuid;
    el[ctx].bindingFn = handler;
  },

  beforeUnmount(el: ClickOutsideEl) {
    let len = nodeList.length;

    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
    delete el[ctx];
  },
};
export default (app: App) => app.directive("clickoutside", clickOutside);
