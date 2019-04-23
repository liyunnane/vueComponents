<style scoped>
  .cascader{
      width: 300px;
      text-align: center;
  }
</style>

<template>
    <div
      ref="reference"
      class="cascader"
      @click.stop="handleClick"
      v-clickoutside="handleClickoutside">
      <el-input
        placeholder="产品名称"
        :readonly="true">
          <i slot="suffix" class="el-input__icon el-icon-date"></i>
      </el-input>
    </div>
</template>

<script>
  import Vue from 'vue';
  import CaspanelWrapper from './CaspanelWrapper'
  import Popper from 'element-ui/lib/utils/vue-popper'
  import Clickoutside from 'element-ui/lib/utils/clickoutside';
  const popperMixin = {
    props: {
      placement: {
        type: String,
        default: 'bottom-start'
      },
      appendToBody: Popper.props.appendToBody,
      offset: Popper.props.offset,
      boundariesPadding: Popper.props.boundariesPadding,
      popperOptions: Popper.props.popperOptions
    },
    methods: Popper.methods,
    watch: Popper.watch,
    data: Popper.data,
    beforeDestroy: Popper.beforeDestroy
  };
  export default {
    mixins: [popperMixin],
    directives: { Clickoutside },
    data() {
      return {
        menusVisible: false,


      }
    },
    watch: {
      menusVisible : function (cur) {
         cur?this.showMenu():this.hideMenu();
      }
    },
    methods:{
      handleClick: function () {
        this.menusVisible = !this.menusVisible;
      },
      showMenu: function () {
        if(!this.menu){
          this.initMenu();
        }
        this.menu.visible = true;
        this.$nextTick(() => {
          this.updatePopper()
        })
      },
      hideMenu: function () {
        this.menu.visible = false;
      },
      initMenu: function () {
        this.menu = new Vue(CaspanelWrapper).$mount();
        this.popperElm = this.menu.$el;
      },
      handleClickoutside: function () {
        this.menusVisible = false
      }
    }
  }
</script>

