<template>
  <div class="customize-pictures-warpper">
    <ul>
      <li
        v-for="(item, index) in form.pictureList"
        :key="index"
        :class="alignmentClass"
      >
        <div class="item-main">
          <el-image :src="item.img" fit="cover" v-if="item.img"></el-image>
          <el-image
            :src="require('../../../assets/images/default_picture.png')"
            fit="cover"
            v-else
          ></el-image>
          <div class="title" v-if="form.title">
            <span>{{ item.title }}</span>
          </div>
        </div>
        <div class="subtitle" v-if="form.subtitle">
          <span>{{ item.subtitle }}</span>
        </div>
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
    alignmentClass() {
      return `alignment-style-${this.form.alignmentStyle + 1}`;
    }
  }
};
</script>

<style lang="scss">
.customize-pictures-warpper {
  ul {
    margin: 0px;
    display: flex;
    overflow: hidden;
    li {
      flex-shrink: 0;
      margin-right: 10px;
      padding-bottom: 5px;
      display: flex;
      flex-direction: column;
      &.alignment-style-2 {
        .item-main {
          .title {
            text-align: center;
            span {
              margin-left: 0px;
            }
          }
        }
        .subtitle {
          text-align: center;
          margin-left: 0px;
        }
      }
      .item-main {
        width: 128px;
        height: 128px;
        position: relative;
        .el-image {
          width: 128px;
          height: 128px;
        }
        .title {
          width: 100%;
          position: absolute;
          bottom: 0px;
          left: 0px;
          height: 25px;
          font-size: 13px;
          background-color: rgba($color: #000000, $alpha: 0.3);
          text-align: left;
          line-height: 25px;
          color: #fff;
          span {
            margin-left: 10px;
          }
        }
      }
      .subtitle {
        font-size: 13px;
        text-align: left;
        margin-left: 10px;
        padding: 5px 0px;
      }
    }
  }
}
</style>
