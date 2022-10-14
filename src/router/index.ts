import { createRouter, createWebHistory } from "vue-router";

import layout from "@/layout";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      redirect: "/dashboard",
      component: layout,
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("@/views/dashboard"),
        },
      ],
    },
  ],
});

export default router;
