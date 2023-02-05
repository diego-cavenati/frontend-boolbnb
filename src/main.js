import { createApp } from 'vue'
import App from './App.vue'

// Import router
import { router } from './router';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// use router
createApp(App).use(router).mount('#app');
