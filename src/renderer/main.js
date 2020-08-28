import Vue from 'vue'
import Buefy from 'buefy'
import VueCodemirror from 'vue-codemirror'

import App from './App'
import router from './router'
import store from './store'

// Styles
import 'buefy/dist/buefy.css'
import 'remixicon/fonts/remixicon.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(Buefy)

Vue.use(VueCodemirror)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
