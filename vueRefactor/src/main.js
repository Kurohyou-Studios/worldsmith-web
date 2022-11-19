import { createApp } from 'vue';
import { createPinia } from 'pinia';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */

/* import specific icons */
import { faSun, faEarthOceania, faCircleXmark,faLifeRing, faPenFancy } from '@fortawesome/free-solid-svg-icons'

import App from './App.vue';
import { initRouter } from './router';

import './assets/css/setup.scss';
import './assets/css/social-icons.scss';

/* add icons to the library */
library.add(faSun, faEarthOceania, faCircleXmark, faLifeRing, faPenFancy);

const app = createApp(App);

app.use(createPinia());
const router = initRouter();
app.use(router);

app
  .mount('#app');
