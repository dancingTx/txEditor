import { createElement, addClass, removeClass, on, off } from "@/shared/domOp";
import { arrayify, debounce } from "@/shared/tool";
import styles from "@/style/module/components.module.scss";

const __OFFSET_X__ = 45;
const __MIN_WIDTH__ = 180;
const __MAX_WIDTH__ = window.innerWidth;
interface DragSplitOptions {
  max?: number;
  min?: number;
}
export default class DragSplit {
  private options: DragSplitOptions;
  private el: HTMLElement;
  private state: string | Array<string>;
  private startX: number;
  private startY: number;
  private distanceX: number;
  private distanceY: number;
  private dragStartEvent: (e: Event) => void;
  private debounceDragMoveEvent: (e: Event) => void;
  private dragEndEvent: (e: Event) => void;
  static domTarget: HTMLElement;

  constructor(el: HTMLElement, options: DragSplitOptions) {
    this.state = "normal";
    this.el = el;
    this.options = options || {};
    this.dragStartEvent = () => {};
    this.debounceDragMoveEvent = () => {};
    this.dragEndEvent = () => {};
    this.startX = this.startY = this.distanceX = this.distanceY = 0;
  }
  create(className: string) {
    return createElement("div", undefined, className);
  }
  private render() {
    this.el.parentNode?.insertBefore(DragSplit.domTarget, this.el.nextSibling);
  }
  execute() {
    this.render();
    this.dragStartEvent = this.handleDragStart.bind(this);
    on(DragSplit.domTarget, "mousedown", this.dragStartEvent);
  }
  private handleDragStart(e: Event) {
    this.startX = (e as MouseEvent).clientX;
    this.distanceX = this.startX - DragSplit.domTarget.offsetLeft;
    this.debounceDragMoveEvent = debounce(this.handleDragMoving, 16).bind(this);
    this.dragEndEvent = this.handleDragEnd.bind(this);
    on(document, "mousemove", this.debounceDragMoveEvent);
    on(document, "mouseup", this.dragEndEvent);
  }
  private handleDragMoving(e: Event) {
    const endX = (e as MouseEvent).clientX;
    let moveLength = endX - this.distanceX;
    const minMove = this.options.min || __MIN_WIDTH__;
    if (moveLength <= minMove) {
      moveLength = __OFFSET_X__;
    }
    const maxMove = this.options.max || __MAX_WIDTH__;
    if (moveLength >= maxMove) {
      moveLength = maxMove;
    }
    if (DragSplit.domTarget.previousSibling) {
      (DragSplit.domTarget.previousSibling as HTMLElement).style.width =
        moveLength - __OFFSET_X__ + "px";
    }
  }
  private handleDragEnd(e: Event) {
    off(document, "mousemove", this.debounceDragMoveEvent);
    off(document, "mouseup", this.dragEndEvent);
  }

  switchState(state: string | Array<string>) {
    removeClass(
      DragSplit.domTarget,
      arrayify(this.state).map((item) => styles[`is_${item}`])
    );
    addClass(
      DragSplit.domTarget,
      arrayify(state).map((item) => styles[`is_${item}`])
    );
    this.state = state;
  }

  setInnerDomTarget(domTarget: HTMLElement) {
    DragSplit.domTarget = domTarget;
  }

  getCurrState() {
    return this.state;
  }

  destory() {
    if (DragSplit.domTarget) {
      off(DragSplit.domTarget, "mousedown", this.dragStartEvent);
      DragSplit.domTarget.parentNode?.removeChild(DragSplit.domTarget);
    }
  }
}
