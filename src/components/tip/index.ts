import {
  createApp,
  type App,
  type ComponentPublicInstance,
  type Plugin,
} from "vue";
import TipConstructor, { type TipProps } from "./main";
import { createElement, mount2Body } from "@/shared";
import { DefaultVars, DotMatrixVars } from "@/config/var";

let $tipIns: ComponentPublicInstance;
let Tip: Plugin = {} as Plugin;
const registerInstance = () => {
  const app = createApp(TipConstructor);
  const target = createElement("div");
  $tipIns = app.mount(target);
  mount2Body(target);
};
const defaultOptions: TipProps = {
  orientation: DotMatrixVars.RightBottom,
  ratio: DefaultVars.__TIP_RATIO__,
  duration: 3000,
  size: 300,
  type: "info",
  message: "",
};
Tip.install = (app: App) => {
  const info = {
    visable(options: TipProps) {
      if (!$tipIns) {
        registerInstance();
      }
      options = Object.assign({}, defaultOptions, options);
      console.log($tipIns, "ins");
      //   for (const key of Object.keys(options)) {
      //     ($tipIns as any)[key] = options[key as keyof TipProps];
      //   }
      const onClose = ($tipIns as any)?.onClose;
      ($tipIns as any).onClose = () => {
        onClose();
        options.onClose && options.onClose();
      };

      ($tipIns as any).visable = true;

      return $tipIns;
    },
    hide() {
      if ($tipIns) {
        ($tipIns as any).close();
      }
    },
  };
  app.config.globalProperties.$tip = info;
};

export default Tip;
