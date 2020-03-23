<template>
  <div class="customize-like-warpper">
    <div class="title" v-if="form.titleShow">
      <div class="line"></div>
      <span>{{form.title}}</span>
      <div class="line"></div>
    </div>
    <div class="product-list">
      <ul class="cu-list">
        <li class="cu-item" v-for="(item,index) in form.productList" :key="index">
          <el-image :src="require('../../../assets/images/default_picture.png')" fit="cover"></el-image>
          <div class="title">{{item.title}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>



<script>
export default {
  props: {
    //父组件传过来的表单
    form: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style lang="scss">
.customize-like-warpper {
  margin-top: 20px;
  & > .title {
    display: flex;
    align-items: center;
    justify-content: center;
    .line {
      width: 30px;
      height: 1px;
      background-color: rgb(51, 51, 51);
      margin: 0px 15px;
    }
  }
  .cu-list {
    padding: 0px 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    text-align: left;
    margin-top: 20px;
    .cu-item {
      width: 169px;
      .title {
        margin-top: 10px;
        font-size: 13px;
      }
    }
  }
}
</style>