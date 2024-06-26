import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

library.add(fas, far, fab)
dom.watch();
createApp(App).component("font-awesome-icon", FontAwesomeIcon)
.use(router)
.mount('#app')
