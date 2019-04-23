export default {
  state: {
    count: 0
  },
  getters: {
    oldArr: state=>{
      return state.count*100;
    }
  },
  mutations: {
    increment: state=>{
      state.count+=1;
    }
  },
  actions: {
  
  }
}
