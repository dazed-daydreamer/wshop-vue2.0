<template>
  <div class="customize-picture-warpper">
    <ul :class="listClass">
      <li v-for="(item, index) in form.picture" :key="index">
        <img :src="item.img" alt v-if="item.img" />
        <img src="../../../assets/images/default_banner.png" alt v-else />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    //父组件传过来的表单
    form: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    //不同样式的class
    listClass() {
      return `listtyle-${this.form.style + 1}`;
    }
  }
};
</script>

<style lang="scss">
.customize-picture-warpper {
  ul {
    margin: 0;
    &.listtyle-2 {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 50%;
      }
    }
    li {
      display: flex;
      img {
        width: 100%;
      }
    }
  }
}
</style>
