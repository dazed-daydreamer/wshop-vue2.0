<template>
  <div class="customize-product-warpper">
    <div class="cu-list" :class="listClass">
      <div class="cu-item" v-for="(item,index) in localForm.productList" :key="index">
        <div class="sign-warpper" v-if="localForm.sign">
          <img src="../../../assets/images/common_label2.png" alt />
          <span>{{localForm.signTitle}}</span>
        </div>
        <el-image :src="require('../../../assets/images/default_banner.png')" fit="cover"></el-image>
        <span class="title" v-if="localForm.title">{{item.title}}</span>
        <span class="subtitle" v-if="hasSubtitle">{{item.subtitle}}</span>
        <div class="price-buy">
          <div class="price-warpper">
            <div>
              <span class="price" v-if="localForm.price">￥{{item.price.toFixed(2)}}</span>
              <span
                class="original"
                v-if="localForm.original&&!localForm.member&&hasPartial"
              >￥{{item.original.toFixed(2)}}</span>
              <div v-if="localForm.member&&hasPartial">
                <span class="iconfont icon-huiyuan"></span>
                <span>会员价</span>
              </div>
            </div>
            <div v-if="localForm.sales&&hasPartial">
              <span>已售{{item.sales}}</span>
            </div>
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
            original: 30,
            sales: 0
          },
          {
            title: "这里是商品标题",
            subtitle: "这里是商品副标题",
            price: 20,
            original: 30,
            sales: 0
          },
          {
            title: "这里是商品标题",
            subtitle: "这里是商品副标题",
            price: 20,
            original: 30,
            sales: 0
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
  computed: {
    hasSubtitle() {
      return (
        this.localForm.subtitle &&
        (this.localForm.style === 0 || this.localForm.style === 2)
      );
    },
    listClass() {
      return this.localForm.style === 0
        ? ""
        : `listtyle-${this.localForm.style + 1}`;
    },
    hasPartial() {
      return this.localForm.style >= 3 ? false : true;
    }
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
              original: 30,
              sales: 0
            },
            {
              title: "这里是商品标题",
              subtitle: "这里是商品副标题",
              price: 20,
              original: 30,
              sales: 0
            },
            {
              title: "这里是商品标题",
              subtitle: "这里是商品副标题",
              price: 20,
              original: 30,
              sales: 0
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
  .cu-list {
    .cu-item {
      display: flex;
      flex-direction: column;
      position: relative;
      margin-bottom: 14px;
      .sign-warpper {
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: 40px;
        z-index: 20;
        img {
          width: 100%;
          height: 100%;
        }
        span {
          position: absolute;
          top: 40%;
          left: 44%;
          white-space: nowrap;
          transform: translate(-50%, -50%);
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
        min-height: 29px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .price-warpper {
          display: flex;
          flex-direction: column;
          & > div:nth-of-type(1) {
            display: flex;
            align-items: center;
            div {
              margin-left: 5px;
              background-color: #ffe3b5;
              border-radius: 10px 0px 0px 10px;
              display: flex;
              align-items: center;
              .icon-huiyuan {
                color: $price-color;
              }
              span:nth-of-type(2) {
                margin-left: 5px;
                font-size: 12px;
                padding-right: 5px;
              }
            }
          }
          & > div:nth-of-type(2) {
            margin-top: 2px;
            span {
              font-size: 12px;
              color: $secondary-text-color;
            }
          }
          .price {
            color: $price-color;
          }
          .original {
            margin-left: 5px;
            font-size: 12px;
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
  .cu-list.listtyle-2,
  .cu-list.listtyle-4,
  .cu-list.listtyle-5 {
    display: flex;
    justify-content: space-between;
    padding: 0px 10px;
    flex-wrap: wrap;
    .cu-item {
      width: 48%;
    }
  }

  .cu-list.listtyle-4,
  .cu-list.listtyle-5 {
    .cu-item {
      width: 32%;
      .el-image {
        width: 100%;
        height: 130px;
      }
      .title {
        font-size: 13px;
      }
    }
  }

  .cu-list.listtyle-5 {
    .cu-item {
      transform: scale(0.9);
    }
    .cu-item:nth-of-type(3n + 2) {
      transform: scale(1);
    }
  }
}
</style>