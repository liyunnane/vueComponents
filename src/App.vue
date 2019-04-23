<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <el-button @click="jumpToHello">跳转到hello</el-button>
    <el-button @click="jumpToFoo">跳转到foo</el-button>
    <el-button @click="jumpToBar">跳转到bar</el-button>
    <el-button @click="jumpBack">后退</el-button>

    <el-table :data="tableData">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="参数一" prop="aa"></el-table-column>
    </el-table>

  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return{
        tableData: [{aa:'2121sasas'},{aa:'xxxxxxx'}],
        columns: [
          {
            text: "事件",
            value: "event",
            width: 200
          },
          {
            text: "ID",
            value: "id"
          },
          {
            text: '标题一',
            value: 'xxx',
          }
        ],
      }
    },
    methods: {
      jumpToFoo: function () {
        this.$router.push({
          name: 'foo',
        });
      },
      jumpToBar: function () {
        this.$router.push('/bar/2222')
      },
      jumpBack: function () {
        this.$router.go(-1)
      },
      jumpToHello: function () {
        this.$router.push('/usr/111')
      },
    }
  }
</script>

<style>
  @import "element-ui/lib/theme-chalk/index.css";
  .slide-info-enter{
    opacity: 0;
  }
  .slide-info-enter-to{
    opacity: 1;
  }
  .slide-info-active-active{
    transition: all 1s ease;
  }
  .slide-info-leave{
    opacity: 1;
  }
  .slide-info-leave-to{
    opacity: 0;
  }
  .slide-info-leave-active{
    transition: all 1s ease;
  }
</style>
