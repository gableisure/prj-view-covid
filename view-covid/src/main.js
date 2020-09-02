import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js';
import vueNumeralFilterInstaller from 'vue-numeral-filter';
 
Vue.use(vueNumeralFilterInstaller, { locale: 'en-gb' });
Vue.config.productionTip = false
Vue.use(Chartkick.use(Chart))

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
