import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import { router } from './router';
import store from './store';
import './registerServiceWorker';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import axios from 'axios';

Vue.config.productionTip = false;

// This is how we can make variables global to our vue app in order to use them in any component
// Eg: We make axios global so that we don't have to import it everywhere
Vue.prototype.$http = axios;
Vue.prototype.$httpOptions = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
};

// Instanciating the vue app with the middlewares we initialized (router, vuex store)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
