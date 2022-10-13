import { on } from "@/shared/domOp";
import { makeUUID } from "@/shared/variables";
import type { DirectiveBinding, VNode } from "vue";

const nodeList: HTMLElement[] = [];
const ctx = "@@clickoutsideContext";
const uuid = makeUUID();
let startClick: MouseEvent;
let seed = 0;

interface Options {}

interface ValueProps extends Options {
  handler: (e: Event) => void;
}

on(document, "mousedown", (e: Event) => (startClick = e as MouseEvent));

on(document, "mouseup", (e: Event) => {
  nodeList.forEach((node) =>
    (node as Record<string, any>)[ctx].documentHandler(e, startClick)
  );
});

function createDocumentHandler(
  el: HTMLElement,
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

    if (
      uuid &&
      (el as Record<string, any>)[ctx].methodName &&
      vnode[(el as Record<string, any>)[ctx].methodName]
    ) {
      vnode[(el as Record<string, any>)[ctx].methodName]();
    } else {
      (el as Record<string, any>)[ctx].bindingFn &&
        (el as Record<string, any>)[ctx].bindingFn();
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
export default {
  mounted(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    nodeList.push(el);
    const id = seed++;
    const { handler } = binding.value as ValueProps;
    (el as Record<string, any>)[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: uuid,
      bindingFn: handler,
    };
  },

  updated(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    const { handler } = binding.value as ValueProps;
    (el as Record<string, any>)[ctx].documentHandler = createDocumentHandler(
      el,
      binding,
      vnode
    );
    (el as Record<string, any>)[ctx].methodName = uuid;
    (el as Record<string, any>)[ctx].bindingFn = handler;
  },

  beforeUnmount(el: HTMLElement) {
    let len = nodeList.length;

    for (let i = 0; i < len; i++) {
      if (
        (nodeList[i] as Record<string, any>)[ctx].id ===
        (el as Record<string, any>)[ctx].id
      ) {
        nodeList.splice(i, 1);
        break;
      }
    }
    delete (el as Record<string, any>)[ctx];
  },
};
