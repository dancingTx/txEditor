import { createRouter, createWebHistory } from "vue-router";
import { plugins } from "@/config/default";

import layout from "@/layout";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      redirect: "/sourceManage",
      component: layout,
      children: plugins,
    },
  ],
});

export default router;
