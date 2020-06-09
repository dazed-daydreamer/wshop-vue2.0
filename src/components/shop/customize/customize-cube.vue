<template>
  <div
    class="customize-cube-warpper"
    ref="cube"
    :style="{ height: `${cubeSize}px` }"
  >
    <div class="cube-chunks" v-if="form.chunks.length">
      <ul>
        <li
          v-for="(item, index) in form.chunks"
          :key="index"
          :style="{
            top: `${item.top * cubeItemSize}px`,
            left: `${item.left * cubeItemSize}px`,
            width: `${item.width * cubeItemSize}px`,
            height: `${item.height * cubeItemSize}px`,
            padding: `${form.clearance}px`
          }"
        >
          <el-image :src="item.img" fit="cover" v-if="item.img"></el-image>
          <span v-else>请插入图片</span>
        </li>
      </ul>
    </div>
    <div class="cube-blank" v-else>请开始布局</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cubeSize: 0
    };
  },
  props: {
    //父组件传过来的表单
    form: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    setTimeout(() => {
      this._initCube();
    }, 100);
  },
  methods: {
    //初始化魔方
    _initCube() {
      this.cubeSize = this.$refs.cube.offsetWidth;
    }
  },
  computed: {
    //每个份额的尺寸
    cubeItemSize() {
      return this.cubeSize / this.form.share;
    }
  }
};
</script>

<style lang="scss">
.customize-cube-warpper {
  .cube-blank {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
  .cube-chunks {
    width: 100%;
    height: 100%;
    ul {
      margin: 0;
      position: relative;
      width: 100%;
      height: 100%;
      li {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        span {
          font-size: 12px;
        }
        .el-image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
