import {
  createRouter,
  createWebHashHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";

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
    meta: {
      title: "Dashboard",
    },
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "dashboard",
          icon: "sidebar-dashboard",
        },
      },
    ],
  },
];

export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/test1",
    name: "Test1",
    component: layout,
    redirect: "/test1/index",
    meta: {
      roles: ["admin"],
      icon: "sidebar-example",
    },
    children: [
      {
        path: "index",
        name: "Foo",
        component: () => import("@/views/foo/index.vue"),
        meta: {
          title: "测试1",
          icon: "sidebar-eye-open",
        },
      },
    ],
  },
  {
    path: "/test2",
    name: "Test2",
    component: layout,
    redirect: "/test/baz1",
    meta: {
      title: "测试2",
      icon: "sidebar-form",
    },
    children: [
      {
        path: "baz1",
        name: "Baz1",
        component: () => import("@/views/baz/baz1.vue"),
        meta: {
          title: "测试2-1",
          icon: "sidebar-table",
        },
        children: [
          {
            path: "baz11",
            name: "Baz11",
            component: () => import("@/views/baz/baz1.vue"),
            meta: {
              title: "测试2-1-1",
              icon: "sidebar-tree",
            },
          },
          {
            path: "baz112",
            name: "Baz112",
            component: () => import("@/views/baz/baz1.vue"),
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

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export default router;
