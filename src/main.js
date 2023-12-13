import { createApp } from 'vue'


import { Quasar } from 'quasar'
import App from './App.vue'
import router from './router'


// Import Quasar css
import 'quasar/src/css/index.sass'
import 'quasar/src/css/flex-addon.sass'


//  // Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import 'quasar/src/css/core/dark.sass'

const app = createApp(App);
app.use(router);
app.use(Quasar, {
    config: {
        brand:{
            dark: '#1d1d1d',
            'dark-page': '#2a2a2a',

        } ,

        dark: true,
    },
    plugins: {}, // import Quasar plugins and add here
});
app.mount('#app')



