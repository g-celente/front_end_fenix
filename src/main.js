import './style.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from "vuetify/lib/framework.mjs";
import { aliases, mdi }  from 'vuetify/iconsets/mdi'
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import vuetify_icons from "./vuetify";

import App from './App.vue'
import router from './router/index.js'  

const app = createApp(App)
const vuetify = createVuetify({
    icons: {
      defaultSet: "mdi", // Define o Material Design Icons como padrão
    },
    components,
    directives,
});

app.use(createPinia())
app.use(router)
app.use(vuetify)
//app.use(vuetify_icons)

app.mount('#app')
