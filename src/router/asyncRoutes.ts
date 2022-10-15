import { RouteRecordRaw } from "vue-router";
const layout = () => import("@/layout/index.vue");

export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/components",
    name: "Components",
    component: layout,
    redirect: "/components/clip",
    meta: {
      roles: ["admin"],
      icon: "sidebar-eye-open",
      title: "组件",
    },
    children: [
      {
        path: "clip",
        name: "Clip",
        component: () => import("@/views/components/clip/index.vue"),
        meta: {
          title: "clip",
          icon: "sidebar-example",
        },
      },
      {
        path: "swiper",
        name: "Swiper",
        component: () => import("@/views/components/swiper/index.vue"),
        meta: {
          title: "swiper",
          icon: "sidebar-form",
        },
      },
    ],
  },
  {
    path: "/test2",
    name: "Test2",
    component: layout,
    redirect: "/test2/baz1",
    meta: {
      title: "测试2",
      icon: "sidebar-form",
    },
    children: [
      {
        path: "baz1",
        name: "Baz1",
        component: () => import("@/views/baz/baz1.vue"),
        redirect: "/test2/baz1/baz11",
        meta: {
          title: "测试2-1",
          icon: "sidebar-table",
        },
        children: [
          {
            path: "baz11",
            name: "Baz11",
            component: () => import("@/views/dashboard/index.vue"),
            meta: {
              title: "测试2-1-1",
              icon: "sidebar-tree",
            },
          },
          {
            path: "baz12",
            name: "Baz12",
            component: () => import("@/views/baz/baz2.vue"),
            meta: {
              title: "测试2-1-2",
              icon: "sidebar-user",
            },
          },
        ],
      },
      {
        path: "baz2",
        name: "Baz2",
        component: () => import("@/views/baz/baz2.vue"),
        meta: {
          title: "测试2-2",
          icon: "sidebar-nested",
        },
      },
    ],
  },
];
