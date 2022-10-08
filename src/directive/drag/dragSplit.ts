import { createElement, addClass, removeClass, on, off } from "@/shared/domOp";
import { arrayify, debounce } from "@/shared/tool";
import styles from "@/style/module/components.module.scss";

const __ASIDE_WIDTH__ = 48;
const __SPLIT_LINE_WIDTH__ = 4;

const __MIN_WIDTH__ = 180;
const __MIN_HEIGHT__ = 120;
const __MAX_WIDTH__ = window.innerWidth;
const __MAX_HEIGHT__ = window.innerHeight - __MIN_HEIGHT__;

interface DragSplitOptions {
  max?: number;
  min?: number;
  orientation?: string;
}
type ArrayifyString = string | string[];
export default class DragSplit {
  private serveForThis: HTMLElement;
  private options: DragSplitOptions;
  private el: HTMLElement;
  private state: ArrayifyString;
  private prevState: ArrayifyString;
  private orientation: string;
  private distanceX: number;
  private distanceY: number;
  private dragStartEvent: (e: Event) => void;
  private debounceDragMoveEvent: (e: Event) => void;
  private dragEndEvent: (e: Event) => void;
  static domTarget: HTMLElement;

  constructor(el: HTMLElement, options: DragSplitOptions) {
    this.prevState = this.state = "normal";
    this.el = el;
    this.serveForThis = this.create();
    this.options = options || {};
    this.orientation = options.orientation || "left";
    this.dragStartEvent = () => {};
    this.debounceDragMoveEvent = () => {};
    this.dragEndEvent = () => {};
    this.distanceX = this.distanceY = 0;
  }
  private preventDefaultEvent(e: Event) {
    e.preventDefault();
    return false;
  }
  create(className?: string) {
    return createElement("div", undefined, className);
  }
  private render() {
    const siblingDom =
      this.orientation === "left"
        ? this.el.nextSibling
        : this.orientation === "right"
        ? this.el
        : null;
    this.el.parentNode?.insertBefore(this.serveForThis, siblingDom);
  }
  execute() {
    this.render();
    this.dragStartEvent = this.handleDragStart.bind(this);
    on(this.serveForThis, "mousedown", this.dragStartEvent);
  }
  private handleDragStart(e: Event) {
    //  水平拖拽
    if (this.state === "horizontal") {
      this.distanceX = (e as MouseEvent).clientX - this.serveForThis.offsetLeft;
    }
    // 垂直拖拽
    if (this.state === "vertical") {
      this.distanceY = (e as MouseEvent).clientY - this.serveForThis.offsetTop;
    }

    this.debounceDragMoveEvent = debounce(this.handleDragMoving, 16).bind(this);
    this.dragEndEvent = this.handleDragEnd.bind(this);
    on(document, "mousemove", this.debounceDragMoveEvent);
    on(document, "mouseup", this.dragEndEvent);
    on(document, "selectstart", this.preventDefaultEvent);
    on(document, "dragstart", this.preventDefaultEvent);
  }
  private handleDragMoving(e: Event) {
    const calculateDistance = (distance: number) =>
      distance + __SPLIT_LINE_WIDTH__ + "px";
    if (this.state === "horizontal") {
      const endX = (e as MouseEvent).clientX;
      let moveLength = endX - this.distanceX;
      const minMove = this.options.min || __MIN_WIDTH__;
      if (moveLength <= minMove) {
        moveLength = minMove;
        if (!this.serveForThis.classList.contains(styles.is_right)) {
          addClass(this.serveForThis, styles.is_right);
        }
      } else {
        if (this.serveForThis.classList.contains(styles.is_right)) {
          removeClass(this.serveForThis, styles.is_right);
        }
      }
      const maxMove = this.options.max || __MAX_WIDTH__;
      if (moveLength >= maxMove) {
        moveLength = maxMove;
      }
      const siblingDom =
        this.orientation === "left"
          ? this.serveForThis.previousSibling
          : this.orientation === "right"
          ? this.serveForThis.nextSibling
          : null;
      if (siblingDom) {
        (siblingDom as HTMLElement).style.width = calculateDistance(
          moveLength - __ASIDE_WIDTH__
        );
      }
    }

    if (this.state === "vertical") {
      const endY = (e as MouseEvent).clientY;
      let moveLength = endY + this.distanceY;
      const minMove = this.options.min || __MIN_HEIGHT__;
      if (moveLength <= minMove) {
        moveLength = minMove;
        if (!this.serveForThis.classList.contains(styles.is_bottom)) {
          addClass(this.serveForThis, styles.is_bottom);
        }
      } else {
        if (this.serveForThis.classList.contains(styles.is_bottom)) {
          removeClass(this.serveForThis, styles.is_bottom);
        }
      }

      const maxMove = this.options.max || __MAX_HEIGHT__;
      if (moveLength >= maxMove) {
        moveLength = maxMove;
        if (!this.serveForThis.classList.contains(styles.is_top)) {
          addClass(this.serveForThis, styles.is_top);
        }
      } else {
        if (this.serveForThis.classList.contains(styles.is_top)) {
          removeClass(this.serveForThis, styles.is_top);
        }
      }
      if (this.serveForThis.previousSibling) {
        (this.serveForThis.previousSibling as HTMLElement).style.height =
          calculateDistance(moveLength - 62);
      }
    }
  }
  private handleDragEnd(e: Event) {
    off(document, "mousemove", this.debounceDragMoveEvent);
    off(document, "mouseup", this.dragEndEvent);
    off(document, "selectstart", this.preventDefaultEvent);
    off(document, "dragstart", this.preventDefaultEvent);
  }

  hasState(state: ArrayifyString) {
    const classNames = this.serveForThis.className.split(/\s+/);
    const states = arrayify(state).map((item) => styles[`is_${item}`]);
    return classNames.some((item) => states.includes(item));
  }

  switchState(state: ArrayifyString) {
    removeClass(
      this.serveForThis,
      arrayify(this.state).map((item) => styles[`is_${item}`])
    );
    addClass(
      this.serveForThis,
      arrayify(state).map((item) => styles[`is_${item}`])
    );
    this.prevState = this.state;
    this.state = state;
  }

  setInnerDomTarget(domTarget: HTMLElement) {
    this.serveForThis = domTarget;
  }

  getCurrState() {
    return this.state;
  }
  destory() {
    if (this.serveForThis) {
      off(this.serveForThis, "mousedown", this.dragStartEvent);
      this.serveForThis.parentNode?.removeChild(this.serveForThis);
    }
  }
}
