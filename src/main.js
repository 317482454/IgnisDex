// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './router/axios'
import g from './router/g'
import hebejs from './hebejs/index'

Vue.config.productionTip = false
Vue.http = Vue.prototype.$http = axios
Vue.g = Vue.prototype.$g = g
Vue.prototype.$hebejs = hebejs;
import VueI18n from 'vue-i18n'


Vue.use(VueI18n);

let lang = ''
if (localStorage.getItem('lang') != null) {
  lang = localStorage.getItem('lang');
  localStorage.setItem('lang', lang);

} else {
  lang = (navigator.systemLanguage ? navigator.systemLanguage : navigator.language);
  if (lang != 'zh-CN' && lang != 'en-US') {
    lang = "en-US"
  }
  localStorage.setItem('lang', lang);
}

let i18n = new VueI18n({
  locale: lang,    // 语言标识
  messages: {
    'zh-CN': require('./lang/zh'),   // 中文语言包
    'en-US': require('./lang/en')    // 英文语言包x
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: {App},
  template: '<App/>'
})
