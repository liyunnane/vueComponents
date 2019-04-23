<template>
  <div>
    <el-date-picker v-model="date"></el-date-picker>
    <el-button @click="clickDate">点击</el-button>
    <span>{{nub.num!==''?'':(nub.num|formatMoney)}}</span>
  </div>
</template>

<script>
  const formCfg = {
    props: {
      rules: 212122,
      model: 'sssssssss'
    }
  }
  export default {
    name: 'HelloWorld',
    props: {
      aa: {
        type: String,
        default: 'aaa'
      },

    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        date: '',
        nub: {
          num: ''
        },
        datas: [
          {
            eee: '11212121',
            ffff: '3232323232',
            gggg: 'qwqwqwqwqwq'
          }
        ]
      }
    },
    methods:{
      clickDate: function () {
        this.date = '20190302';

      }
    }
    // render(h) {
    //   const formCfg = {
    //     props: {
    //       rules: 212122,
    //       model: 'sssssssss'
    //     }
    //   }
    //   console.log(...formCfg)
    //   return ( < div> <el-date-picker v-model="date"></el-date-picker> </div>)
    // }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
