import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueVirtualScroller from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import VueCompositionAPI from "@vue/composition-api";

Vue.config.productionTip = false;

Vue.use(VueVirtualScroller);
Vue.use(VueCompositionAPI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
