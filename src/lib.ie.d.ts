interface Window {
    attachEvent(event: string, listerner: EventListener): boolean;
    detachEvent(event:string, listerner: EventListener): void;
}