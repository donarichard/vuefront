import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from "vue";
import './plugins/bootstrap-vue'
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

import router from "./route";

import env from './components/env'

import "@fortawesome/vue-fontawesome";
import {
  FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";

import 'material-design-icons-iconfont/dist/material-design-icons.css';

import VueCharts from "vuechart";

import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css';

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(VueCharts);
Vue.use(KeenUI);
new Vue({
  vuetify,
  router,
  env,
  render: h => h(App)
}).$mount("#app");