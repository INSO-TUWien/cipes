import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import 'bootstrap';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

library.add(faSearch);

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  render: h => h(App)
}).$mount('#app');
