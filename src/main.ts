import { createApp } from "vue";
import { createPinia } from "pinia";

import "virtual:svg-icons-register";
import svgIcon from "./components/svgIcon";
import { GlobalCommand } from "@/components/toolkit/command/command";
import { defaultTheme, defaultLanguage } from "@/config/default";

import App from "./App";
import router from "./router";
import i18n from "./locale";

import "normalize.css";
import "@/style/common.scss";

const app = createApp(App);
const globalCommand = GlobalCommand.getInstance();

/**
 * 注册默认主题
 */
globalCommand.invokeCommand("Theme", defaultTheme).execute();
/**
 * 注册默认语言
 */
globalCommand.invokeCommand("I18n", defaultLanguage).execute();

app.config.globalProperties = {
  globalCommand,
};

app.use(createPinia()).use(router).use(i18n).component("svg-icon", svgIcon);

app.mount("#app");
