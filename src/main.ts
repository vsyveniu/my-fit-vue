import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueCookies from 'vue-cookies';
import './style.css';
import { createPinia } from 'pinia';
import App from './App.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import router from './routes';
import { mutateReqConfig } from './http-interceptors/request';
import { mutateResConfig } from './http-interceptors/response';

const pinia = createPinia();
const app = createApp(App);

app.component('Header', Header);
app.component('Footer', Footer);

app.use(pinia);
//app.use(VueCookies, { expire: '1d' });

axios.interceptors.request.use(
  async function (config) {
    await mutateReqConfig(config, router); // has side effect! mutates config object
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  async function (config) {
    await mutateResConfig(config, router, axios); // has side effect! mutates config object
    return config;
  },
  function (error) {
    if (error.response.status === 401) return router.push('/login');
    return Promise.reject(error);
  },
);

axios.defaults.withCredentials = true;
app.use(VueAxios, axios);

app.use(router);

app.mount('#app');
