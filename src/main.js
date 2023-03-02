import { createApp } from 'vue'
import * as bootstrap from 'bootstrap'

import './assets/scss/general.scss'
import App from './App.vue'

// Import router
import { router } from './router';
// import Font Awesome
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

// datapicker
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'



// use router
createApp(App).use(router).mount('#app');
