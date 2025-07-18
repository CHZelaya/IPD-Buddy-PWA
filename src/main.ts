/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

// Components
import App from './App.vue';
import '@/services/firebase-init.ts';

// Composables
import { createApp } from 'vue';

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

// Styles
import 'unfonts.css';

const app = createApp(App);

app.use(pinia);
registerPlugins(app);

app.mount('#app');
