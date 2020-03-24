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
          <div class="price">
            <span>￥{{item.price}}</span>
            <span>￥{{item.original}}</span>
          </div>
          <div class="buy">
            <div>
              <span>已售卖</span>
              <span>{{item.sales}}</span>
            </div>
            <span>购买</span>
          </div>
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
@import "@/styles/theme.scss";
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
      .price {
        margin-top: 3px;
        span:nth-of-type(1) {
          color: $price-color;
        }
        span:nth-of-type(2) {
          margin-left: 5px;
          font-size: 12px;
          color: #909399;
          text-decoration: line-through;
        }
      }
      .buy {
        display: flex;
        justify-content: space-between;
        margin-top: 3px;
        align-items: center;
        div {
          span {
            font-size: 12px;
            color: #909399;
          }
        }
        & > span {
          background-color: #2589ff;
          color: #fff;
          font-size: 12px;
          padding: 6px;
        }
      }
    }
  }
}
</style>