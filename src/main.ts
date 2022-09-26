import { createApp } from "vue";
import { createPinia } from "pinia";

import "virtual:svg-icons-register";
import svgIcon from "./components/svgIcon";

import App from "./App";
import router from "./router";

import "normalize.css";
import "@/style/common.scss";

const app = createApp(App);

app.use(createPinia()).use(router).component("svg-icon", svgIcon);

app.mount("#app");
