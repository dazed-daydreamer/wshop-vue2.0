<template>
  <div class="customize-product-warpper">
    <el-image  :src="require('../../../assets/images/default_banner.png')" fit="cover"></el-image>
    <span class="title">{{localForm.title}}</span>
    <span class="subtitle">{{localForm.subtitle}}</span>
    <div class="price-buy">
      <div class="price-warpper">
        <span class="price">￥{{localForm.price.toFixed(2)}}</span>
        <span class="original" v-if="localForm.original">￥{{localForm.original.toFixed(2)}}</span>
      </div>
      <div class="buy-warpper">
        <span v-if="localForm.buyStyle === 0" class="style-1">购买</span>
        <span v-else-if="localForm.buyStyle === 1" class="el-icon-circle-plus style-2"></span>
        <span v-else class="iconfont style-3 icon-gouwuche"></span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    form: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      localForm: {
        title: "这里是商品标题",
        subtitle: "这里是商品副标题",
        price: 20,
        style: 0,
        buyStyle: 0,
        original: 30
      }
    };
  },
  watch: {
    form: {
      handler(e) {
        this.localForm = Object.assign(this.localForm, e);
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
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-bottom: 15px;
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
</style>