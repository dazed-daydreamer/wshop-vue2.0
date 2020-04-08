<template>
  <div class="icon-select-warpper">
    <l-dialog ref="dialog" title="图标选择器">
        
    </l-dialog>
  </div>
</template>

<script>
import LDialog from "./public/l-dialog.vue";
export default {
  data() {
    return {};
  },
  mounted() {
    this.$refs.dialog.show();
  },
  components: { LDialog }
};
</script>


<style lang="scss">
</style>