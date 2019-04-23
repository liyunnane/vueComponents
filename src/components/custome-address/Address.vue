<style scoped>

</style>

<template>
  <div>
    2121221
    <p v-bind="$attrs">{{$attrs}}</p>
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    data(){
      return{
        a:1,
        b:2
      }
    }
  }
</script>

