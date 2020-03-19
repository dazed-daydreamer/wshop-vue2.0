<template>
  <div class="customize-product-warpper">
    <div class="cu-list">
      <div class="cu-item" v-for="(item,index) in localForm.productList" :key="index">
        <div class="sign-warpper" v-if="localForm.sign">
          <img src="../../../assets/images/common_label2.png" alt="">
          <span>{{localForm.signTitle}}</span>
        </div>
        <el-image :src="require('../../../assets/images/default_banner.png')" fit="cover"></el-image>
        <span class="title" v-if="localForm.title">{{item.title}}</span>
        <span class="subtitle" v-if="localForm.subtitle">{{item.subtitle}}</span>
        <div class="price-buy">
          <div class="price-warpper">
            <span class="price" v-if="localForm.price">￥{{item.price.toFixed(2)}}</span>
            <span class="original" v-if="localForm.original">￥{{item.original.toFixed(2)}}</span>
          </div>
          <div class="buy-warpper" v-if="localForm.buyStyle != -1">
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
        style: 0,
        productList: [
          {
            title: "这里是商品标题",
            subtitle: "这里是商品副标题",
            price: 20,
            original: 30
          }
        ],
        original: false,
        buyStyle: 0,
        title: true,
        subtitle: true,
        price: true,
        sales: false,
        member: false,
        sign: false,
        signTitle: "推荐",
        product: 0,
        sort: 0,
        sortType: 0
      }
    };
  },
  watch: {
    //监听父级传过来的表单。赋值给本地表单
    form: {
      handler(val) {
        this.localForm = Object.assign(this.localForm, val);
        if (
          !this.localForm.productList ||
          this.localForm.productList.length === 0
        ) {
          this.$set(this.localForm, "productList", [
            {
              title: "这里是商品标题",
              subtitle: "这里是商品副标题",
              price: 20,
              original: 30
            }
          ]);
        }
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
      position: relative;
      .sign-warpper{
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: 40px;
        z-index: 20;
        img{
          width: 100%;
          height: 100%;
        }
        span{
          position: absolute;
          top: 40%;
          left: 44%;
          white-space:nowrap;
          transform: translate(-50%,-50%);
          font-size: 12px;
          color: #fff;
        }
      }
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