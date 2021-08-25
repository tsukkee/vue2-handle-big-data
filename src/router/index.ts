import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import DataInit from "../views/DataInit.vue";
import DataVirtualScroll from "../views/DataVirtualScroll.vue";
import DataObjectFreeze from "../views/DataObjectFreeze.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/init",
    name: "DataInit",
    component: DataInit,
  },
  {
    path: "/virtualscroll",
    name: "DataVirtualScroll",
    component: DataVirtualScroll,
  },
  {
    path: "/objectfreeze",
    name: "DataObjectFreeze",
    component: DataObjectFreeze,
  },
  { path: "*", redirect: "/init" },
];

const router = new VueRouter({
  routes,
});

export default router;
