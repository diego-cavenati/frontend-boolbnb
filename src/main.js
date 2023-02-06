import { createApp } from 'vue'
import App from './App.vue'


// Import router
import { router } from './router';



import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// use router
createApp(App).use(router).mount('#app');
