import Vuex from 'vuex'
import Vue from 'vue'
import  ModuleA from './Modules/moduleA'
import  ModuleB from './Modules/moduleB'
Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    ModuleA: ModuleA,
    ModuleB: ModuleB
  }
})
