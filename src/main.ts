import { createApp } from 'vue';
import App from '@/App.vue';

const app = createApp(App);

// pinia store
import { createPinia } from 'pinia';
const pinia = createPinia();
app.use(pinia);

import router from '@/router';
app.use(router);

// main app css
import '@/assets/css/app.css';

// perfect scrollbar
import PerfectScrollbar from 'vue3-perfect-scrollbar';
app.use(PerfectScrollbar);

//vue-meta
import { createHead } from '@vueuse/head';
const head = createHead();
app.use(head);

// set default settings
import appSetting from '@/app-setting';
appSetting.init();

// popper
import Popper from 'vue3-popper';
app.component('Popper', Popper);

import { Icon } from '@iconify/vue';
app.component('Icon', Icon);

import Modal from '@/components/Modal.vue';
app.component('Modal', Modal);

app.mount('#app');
