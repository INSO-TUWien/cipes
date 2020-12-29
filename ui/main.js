import Vue from 'vue';
import App from './App';
import 'bootstrap';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {faSearchengin} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import BootstrapVue from 'bootstrap-vue';

library.add(faSearch, faSearchengin);

Vue.config.productionTip = false;
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue);

new Vue({
  render: h => h(App)
}).$mount('#app');
