import { h } from "vue";
export default class Canvas {
  public uid: string;

  constructor(uid: string) {
    this.uid = uid;
  }

  render() {
    return h("div", null, this.uid);
  }
}
