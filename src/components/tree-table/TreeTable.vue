<style scoped>
  @keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
  }
  .ms-tree-space::before {
    content: "";
  }
  .processContainer {
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }
  .tree-ctrl {
    position: relative;
    cursor: pointer;
    color: #2196f3;
    margin-left: -18px;
  }
</style>

<template>
  <el-table ref="multipleTable" :data="formatData" :row-style="showRow" v-bind="$attrs">
    <el-table-column :render-header="renderHeader" width="50" align="center">
      <template slot-scope="scope">
        <el-checkbox v-model="scope.row.checks" @change="toggleSelectItem(scope.row)"></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column v-for="(column, index) in columns" :key="column.value" :label="column.text" :width="column.width">
      <template slot-scope="scope">
        <span v-for="space in (scope.row._level+1)" v-if="index === 0" :key="space" class="ms-tree-space"/>
        <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"/>
          <i v-else class="el-icon-minus"/>
        </span>
        {{ scope.row[column.value] }}
      </template>
    </el-table-column>

    <el-table-column label="21212" value="event">

    </el-table-column>
    <slot/>
  </el-table>
</template>

<script>
  import Vue from 'vue'
  function translateDataStructure(newarr, oldarr, parent, level) {
    oldarr.forEach(item => {
      // 加减号是否出现
      if(item.child&&item.child.length>0){
        Vue.set(item, "_expanded", false);
      }
      // 第几层级数据
      item._level = (level || level===0)? level + 1 : 0;
      if (parent) {
        Vue.set(item, 'parentId', parent.id);
        Vue.set(item, 'parent', parent);
      }

      Vue.set(item, 'childLength', item.child?item.child.length:0);
      Vue.set(item, 'checks', false);
      newarr.push(item);
      if (item.child && item.child.length > 0) {
        let children = item.child;
        translateDataStructure(newarr,children, item, item._level);
      }
    });
  }

  export default {
    name: "TreeTable",
    data() {
      return {
        choseAll: false,
        checkedIds : [],
      };
    },
    props: {
      data: {
        type: [Array, Object],
        required: true
      },
      columns: {
        type: Array,
        default: () => []
      },
    },
    computed: {
      formatData: function () {
        let tmp;
        if (!Array.isArray(this.data)) {
          tmp = [this.data];
        } else {
          tmp = this.data;
        }

        let arr = [];
        translateDataStructure(arr,tmp);
        console.log(arr);
        return arr;
      }
    },
    methods: {
      showRow: function (row) {
        const show = row.row.parent
          ? row.row.parent._expanded&&row.row.parent._show
          : true;
        row.row._show = show;
        return show
          ? "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;"
          : "display:none;";
      },
      //设置表头全选
      renderHeader(h) {
        return h("span", [
          h("input", {
            attrs: {
              id: "chooseall",
              type: "checkbox",
              style:
                "border: 1px solid #dcdfe6;border-radius: 2px;box-sizing: border-box;width: 14px;height: 14px;background-color: #fff;",
            }
          })
        ]);
      },
      // 图标显示
      iconShow(index, record) {
        return index === 0 && record.childLength>0
      },
      // 切换下级是否展开
      toggleExpanded: function (trIndex) {
        this.formatData[trIndex]._expanded = !this.formatData[trIndex]._expanded
      },
      /**
       * 选中复选框
       * @param row
       */
      toggleSelectItem(row) {
        // 如果有后代元素，则所有的后代元素与父元素同步
        if (row.childLength>0) {
          this.toggleSelectChildItem(row.child, row.checks);
        }else{
           row.checks?this.checkedIds.push(row.id):this.checkedIds.splice(this.checkedIds.indexOf(row.id),1)
        }
        // 判断当前元素有没有父元素，如果有父元素，则通过查找所有兄弟元素的选中状态来判断当前元素的父元素的选中状态
        this.toggleSelectParentItem(row, row.checks);
      },
      toggleSelectChildItem(arr, key) {console.log(arr);
        arr.forEach((v, i) => {
          v.checks = key;
          if (v.child) {
            this.toggleSelectChildItem(v.child, v.checks);
          }else{
            key?this.checkedIds.push(v.id):this.checkedIds.splice(this.checkedIds.indexOf(v.id),1)
          }
        });
      },
      toggleSelectParentItem(row, status){
        if(row.parent){
          row.parent.checks = this.isAllSibingSame(row.parent.child,status)?status:false;
          this.toggleSelectParentItem(row.parent,row.parent.checks)
        }else{
          let levelTopArr = this.formatData.filter(item=>item._level===0);
          this.choseAll = this.isAllSibingSame(levelTopArr,row.checks)?status:false
        }
      },
      isAllSibingSame(childArr,status) {
        let result = true;
        childArr.forEach(item=>{
          if(item.checks===!status) {
            result = false;
            return false;
          }
        });
        return result;
      },
    },
    mounted() {
      this.checkedIds = [];
      this.$nextTick(() => {
        var that = this;
        const all = document.getElementById("chooseall");
        all.onchange = function (e) {
          that.choseAll = all.checked;
          let levelTopArr = that.formatData.filter(item=>item._level===0);
          that.toggleSelectChildItem(levelTopArr, all.checked);
        };
      });
    },
    watch: {
      choseAll: function (value) {
        document.getElementById("chooseall").checked = value;
      },
      checkedIds: function (value) {
        console.log(value)
      }
    }
  }
</script>

