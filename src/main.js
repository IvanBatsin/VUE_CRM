import Vue from 'vue'
import App from './App.vue'
import VueMeta from 'vue-meta';

import router from './router'
import store from './store'
import Loader from './components/Loader.vue';
import Paginate from 'vuejs-paginate';

import { tooltip } from './directives/tooltip.directives';
import { dateFilter } from './filters/date';
import { currencyFilter } from './filters/currency';
import { localizeFilter } from './filters/localize';
import { messagePlugin } from './utils/message.plugin';
import { titlePlugin } from './utils/title.plugin';
import 'materialize-css/dist/js/materialize.min.js';

import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID
};

const app = firebase.initializeApp(firebaseConfig);

let vueApp;

Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('locale', localizeFilter);
Vue.directive('tooltip', tooltip);
Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.use(VueMeta);
Vue.config.productionTip = false
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);

app.auth().onAuthStateChanged(() => {
  if (!vueApp) {
    vueApp = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});