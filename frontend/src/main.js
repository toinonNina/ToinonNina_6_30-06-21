import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(IconsPlugin);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

//variable global
Vue.prototype.$localhost = "http://localhost:3000/";

import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');