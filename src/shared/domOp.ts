import { capitalize } from "./data";
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
  target: Window = window,
  eventName: string,
  eventHandler: EventListener,
  options = {}
) => {
  if (target.addEventListener) {
    target.addEventListener(eventName, eventHandler, options);
  } else if (target.attachEvent) {
    target.attachEvent("on" + eventName, eventHandler);
  } else {
    (target as any)["on" + eventName] = eventHandler;
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
  target: Window = window,
  eventName: string,
  eventHandler: EventListener,
  options = {}
) => {
  if (target.removeEventListener) {
    target.removeEventListener(eventName, eventHandler, options);
  } else if (target.detachEvent) {
    target.detachEvent("on" + eventName, eventHandler);
  } else {
    let event = (target as any)["on" + eventName];
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
type DomQuery = Document | Element | string;
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
