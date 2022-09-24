import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App";
import router from "./router";

import "normalize.css"
import "@/style/common.scss"

const app = createApp(App);

app.use(createPinia()).use(router);

app.mount("#app");
