import Vue from 'vue'
import App from './App.vue'
import CalendarPanel from '../packages/index'

Vue.config.productionTip = false
Vue.use(CalendarPanel)


new Vue({
  render: h => h(App),
}).$mount('#app')
