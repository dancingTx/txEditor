import type { HTMLAttributes } from "vue";
import { capitalize, arrayify } from "./tool";
import { isString } from "./validate";
/**
 *
 * @param {HTMLElement} target
 * @param {String} eventName
 * @param {Function} eventHandler
 * @param {Object} options
 * @description 监听器
 */
export const on = (
  target: HTMLElement | Document,
  eventName: string,
  eventHandler: EventListener,
  options = {}
) => {
  if (target.addEventListener) {
    target.addEventListener(eventName, eventHandler, options);
  } else if (target.attachEvent) {
    target.attachEvent("on" + eventName, eventHandler);
  } else {
    (target as Record<string, any>)["on" + eventName] = eventHandler;
  }
};

/**
 *
 * @param {HTMLElement} target
 * @param {String} eventName
 * @param {Function} eventHandler
 * @param {Object} options
 * @description remove 监听器
 */
export const off = (
  target: HTMLElement | Document,
  eventName: string,
  eventHandler: EventListener,
  options = {}
) => {
  if (target.removeEventListener) {
    target.removeEventListener(eventName, eventHandler, options);
  } else if (target.detachEvent) {
    target.detachEvent("on" + eventName, eventHandler);
  } else {
    let event = (target as Record<string, any>)["on" + eventName];
    if (event) {
      event = null;
    }
  }
};

/**
 *
 * @param {HTMLElement | string} domTarget
 * @param {HTMLElement | string} parentDom
 * @param {object} options
 * @returns
 * @description 查找dom
 */
interface QueryOptions {
  multi: boolean;
}
export type DomQuery = Document | Element | string;
export const query = (
  domTarget: DomQuery,
  parentDom?: DomQuery | QueryOptions,
  options = {} as QueryOptions
): DomQuery => {
  if (
    domTarget instanceof Element ||
    domTarget instanceof Document ||
    typeof domTarget !== "string"
  ) {
    return domTarget;
  }
  // normalize
  if (
    typeof parentDom === "object" &&
    !(parentDom instanceof Element || parentDom instanceof Document)
  ) {
    options = parentDom;
    parentDom = document;
  }

  options = options || {};
  parentDom = query(parentDom || document);

  if (!isString(parentDom)) {
    if (options.multi) {
      //   return (parentDom as Document).querySelectorAll(domTarget);
      return "";
    } else {
      return parentDom?.querySelector(domTarget) || domTarget;
    }
  } else {
    const anchors: Record<string, string> = {
      ".": "className",
      "#": "id",
    };
    const anchor = anchors[domTarget.charAt(0)] || "tagName";
    const dom = (parentDom as any)[`getElementBy${capitalize(anchor)}`];
    if (anchor === "id") {
      return dom;
    }
    return options.multi ? dom : dom[0];
  }
};

export const addClass = (
  domTarget: HTMLElement,
  className: string | Array<string>
): void => {
  domTarget.className =
    (domTarget.className ? domTarget.className + " " : "") +
    arrayify(className).join(" ");
};

export const removeClass = (
  domTarget: HTMLElement,
  className: string | Array<string>
): void => {
  const classes = domTarget.className.split(/\s+/);
  const classNames = arrayify(className);
  for (let i = 0, len = classNames.length; i < len; i++) {
    const name = classNames[i];
    for (let j = 0, l = classes.length; j < l; j++) {
      if (classes[j] === name) {
        classes.splice(j, 1);
        break;
      }
    }
  }
  domTarget.className = classes.join(" ");
};

export const toggleClass = (
  domTarget: HTMLElement,
  className: string
): void => {
  const classes = domTarget.className.split(/\s+/);
  const len = classes.length;
  for (let i = 0; i < len; i++) {
    if (classes[i] === className) {
      classes.splice(i, 1);
      break;
    }
  }
  if (len === classes.length) {
    classes.push(className);
  }

  domTarget.className = classes.join(" ");
};

export const createElement = (
  tag: string,
  id?: string,
  className?: string,
  props?: {} & Record<string, any>,
  attributes?: HTMLAttributes & Record<string, any>
): HTMLElement => {
  const domEl = document.createElement(tag);
  if (id) {
    domEl.id = id;
  }
  if (className) {
    addClass(domEl, className);
  }

  if (props) {
    Object.keys(props).forEach((key) => {
      if (props[key] != null) {
        (domEl as Record<string, any>)[key] = props[key];
      }
    });
  }

  if (attributes) {
    Object.keys(attributes).forEach((key) => {
      if (attributes[key] != null) {
        domEl.setAttribute(key, attributes[key]);
      }
    });
  }

  return domEl;
};
