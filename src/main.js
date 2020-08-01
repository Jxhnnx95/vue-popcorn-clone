require("@/fontAwesome");
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/tailwind.css";
import {
  VueSpinners
} from "@saeris/vue-spinners";
import vmodal from 'vue-js-modal'
Vue.use(vmodal)
var infiniteScroll = require("vue-infinite-scroll");
Vue.use(infiniteScroll);

Vue.use(VueSpinners);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");