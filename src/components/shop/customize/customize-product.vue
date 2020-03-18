<template>
  <div class="customize-product-warpper">
    <div class="cu-list">
      <div class="cu-item" v-for="(item,index) in localForm.productList" :key="index">
        <el-image :src="require('../../../assets/images/default_banner.png')" fit="cover"></el-image>
        <span class="title">{{item.title}}</span>
        <span class="subtitle">{{item.subtitle}}</span>
        <div class="price-buy">
          <div class="price-warpper">
            <span class="price">￥{{item.price.toFixed(2)}}</span>
            <span class="original" v-if="localForm.original">￥{{item.original.toFixed(2)}}</span>
          </div>
          <div class="buy-warpper">
            <span v-if="localForm.buyStyle === 0" class="style-1">购买</span>
            <span v-else-if="localForm.buyStyle === 1" class="el-icon-circle-plus style-2"></span>
            <span v-else class="iconfont style-3 icon-gouwuche"></span>
          </div>
        </div>
      </div>
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
  },
  data() {
    return {
      //本地表单
      localForm: {
        productList: [
          {
            title: "这里是商品标题",
            subtitle: "这里是商品副标题",
            price: 20,
            original: 30
          }
        ],
        style: 0,
        buyStyle: 0,
        original: true
      }
    };
  },
  watch: {
    //监听父级传过来的表单。赋值给本地表单
    form: {
      handler(val) {
        this.localForm = Object.assign(this.localForm, val);
      },
      immediate: true,
      deep: true
    }
  }
};
</script>



<style lang="scss">
@import "@/styles/theme.scss";
.customize-product-warpper {
  text-align: left;
  padding-bottom: 15px;
  .cu-list {
    .cu-item {
      display: flex;
      flex-direction: column;
      .el-image {
        width: 100%;
        height: 170px;
      }
      .title {
        margin-top: 10px;
        font-size: 14px;
        padding: 0px 10px;
      }
      .subtitle {
        margin-top: 5px;
        font-size: 12px;
        padding: 0px 10px;
        color: $secondary-text-color;
      }
      .price-buy {
        margin-top: 10px;
        padding: 0px 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .price-warpper {
          display: flex;
          align-items: center;
          .price {
            color: $price-color;
          }
          .original {
            margin-left: 10px;
            font-size: 14px;
            color: $secondary-text-color;
            text-decoration: line-through;
          }
        }
        .buy-warpper {
          .style-1 {
            background-color: $theme-color;
            color: #fff;
            font-size: 12px;
            padding: 6px;
          }
          .style-2,
          .style-3 {
            font-size: 19px;
            color: $theme-color;
          }

          .style-3 {
            font-size: 17px;
          }
        }
      }
    }
  }
}
</style>