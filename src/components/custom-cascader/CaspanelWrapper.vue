<style scoped>

</style>

<script>
  import Caspanel from './Caspanel'
  export default {
    components: {Caspanel},
    data(){
      return {
        visible: false,
      }
    },
    render: function (h) {
      return (
        <transition>
          <div
            class="caspanels"
            v-show={this.visible}
            >
              2121212121
              </div>
        </transition>
      )
    }
  }
</script>

