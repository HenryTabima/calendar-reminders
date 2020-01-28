import Vue from 'vue'
import Buefy from 'buefy'
import PerectScrollbar from 'vue2-perfect-scrollbar'
import Vuelidate from 'vuelidate'
import Meta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'
import 'buefy/dist/buefy.css'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

Vue.use(Meta)
Vue.use(Vuelidate)
Vue.use(Buefy)
Vue.use(PerectScrollbar)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
