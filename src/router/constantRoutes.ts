import { RouteRecordRaw } from "vue-router";
const layout = () => import("@/layout/index.vue");

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    component: layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "dashboard",
          icon: "sidebar-dashboard",
          affix: true,
          // iconEp: 'Location'
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: layout,
    children: [
      {
        path: "",
        component: import("@/components/404/index.vue"),
        meta: {
          title: "404",
          hidden: true,
        },
      },
    ],
  },
];
