// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'
import filters from './filter/index'

Vue.config.productionTip = false;
Vue.use(ElementUI);


Object.keys(filters).forEach(item=>{
  Vue.filter(item, filters[item])
})

router.beforeEach((to,from,next)=>{
  next();
});

import TreeTable from './components/tree-table'

Vue.component('tree-table',TreeTable);

//////////////////////////////////////////////////////////////////////////////////////////

let Car = function () {

};
Car.prototype={
  
  getPrice: function () {
    return new Error('抽象方法不能调用');
  },
  getSpeed: function () {
    return new Error('抽象方法不能调用')
  }
};

let car = new Car();
console.log(car.getPrice());

//////////////////////////////////////////////////////////////////////////////////////////

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
