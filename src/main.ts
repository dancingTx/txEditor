import { createApp } from "vue";
import { createPinia } from "pinia";

import "virtual:svg-icons-register";
import svgIcon from "./components/svgIcon";
import { GlobalCommand } from "@/components/toolkit/command/command";
import { defaultTheme } from "@/config/default";

import App from "./App";
import router from "./router";

import "normalize.css";
import "@/style/common.scss";

const app = createApp(App);
const globalCommand = GlobalCommand.getInstance();

/**
 * 注册默认主题
 */
globalCommand.invokeCommand("Theme", defaultTheme);
globalCommand.execute();

app.config.globalProperties = {
  globalCommand,
};

app.use(createPinia()).use(router).component("svg-icon", svgIcon);

app.mount("#app");
