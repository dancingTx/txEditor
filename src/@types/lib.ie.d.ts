interface GlobalIE {
  attachEvent(event: string, listerner: EventListener): boolean;
  detachEvent(event: string, listerner: EventListener): void;
}
interface HTMLElement extends GlobalIE {}
interface Document extends GlobalIE {}
