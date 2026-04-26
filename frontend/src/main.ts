// Made by: Santiago Manco
import './assets/css/input.css';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import PiniaConfig from './PiniaConfig.js';
import { useAuthStore } from '@/stores/authstore';

const app = createApp(App);

app.use(PiniaConfig.init());
app.use(router);

const authStore = useAuthStore();
await authStore.restoreSession();

app.mount('#app');
