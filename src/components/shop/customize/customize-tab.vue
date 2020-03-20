<template>
  <div class="customize-tab-warpper">
    <div class="tab-warpper">
      <ul class="cu-list">
        <li
          class="cu-item"
          v-for="(item,index) in localForm.tabList"
          :key="index"
          :class="{current:index === localForm.currentTab}"
        >
          <span>{{item.title}}</span>
        </li>
      </ul>
    </div>
    <div class="product-warpper" :class="listClass">
      <ul class="cu-list">
        <li class="cu-item" v-for="(item,index) in productList" :key="index">
          <div class="sign-warpper" v-if="localForm.sign">
            <img src="../../../assets/images/common_label2.png" alt />
            <span>{{localForm.signTitle}}</span>
          </div>
          <el-image :src="require('../../../assets/images/default_banner.png')" fit="cover"></el-image>
          <div class="data-warpper">
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
              <div class="buy-warpper" v-if="localForm.buyStyle != -1&&hasBuy">
                <span v-if="localForm.buyStyle === 0" class="style-1">购买</span>
                <span v-else-if="localForm.buyStyle === 1" class="el-icon-circle-plus style-2"></span>
                <span v-else class="iconfont style-3 icon-gouwuche"></span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //本地表单
      localForm: {
        style: 0,
        tabList: [
          {
            title: "选项",
            product: [
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
            ]
          },
          {
            title: "选项",
            product: [
              {
                title: "这里是商品标题",
                subtitle: "这里是商品副标题",
                price: 20,
                original: 30,
                sales: 0
              }
            ]
          }
        ],
        original: false,
        buyStyle: 0,
        title: true,
        subtitle: true,
        price: true,
        sales: false,
        sign: false,
        signTitle: "推荐",
        product: 0,
        sort: 0,
        sortType: 0,
        currentTab: 0
      }
    };
  },
  computed: {
    //不同的tab返回不同的列表信息
    productList() {
      return this.localForm.tabList[this.localForm.currentTab].product;
    },
    //是否具有二级标题
    hasSubtitle() {
      return (
        this.localForm.subtitle &&
        (this.localForm.style === 0 || this.localForm.style === 2)
      );
    },
    //不同样式的class
    listClass() {
      return `listtyle-${this.localForm.style + 1}`;
    },
    //是否具有部分功能
    hasPartial() {
      return this.localForm.style >= 3 ? false : true;
    },
    //是否具有购买按钮
    hasBuy() {
      return this.localForm.style == 5 || this.localForm.style == 6
        ? false
        : true;
    }
  }
};
</script>


<style lang="scss">
@import "@/styles/theme.scss";
.customize-tab-warpper {
  .tab-warpper {
    line-height: 40px;
    .cu-list {
      display: flex;
      margin: 0;
      .cu-item {
        width: 85px;
        font-size: 14px;
        border-bottom: 2px solid transparent;
        &.current {
          border-color: #ee6135;
        }
      }
    }
  }
  .product-warpper {
    .cu-list {
      margin: 0;
      margin-top: 10px;
      .cu-item {
        margin-bottom: 15px;
        text-align: left;
        .sign-warpper {
          position: absolute;
          top: 0;
          left: 0;
          width: 35px;
          height: 35px;
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
        .data-warpper {
          display: flex;
          flex-direction: column;
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
    }

    &.listtyle-1 {
      .cu-list {
        .cu-item {
          padding: 0px 10px;
        }
      }
    }
  }
}
</style>