import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

import axios from "axios";
Vue.prototype.$axios = axios;
import QS from "qs";
Vue.prototype.qs = QS;
// 公共实例
Vue.prototype.bus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
