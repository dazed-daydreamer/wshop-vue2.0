<template>
  <div class="customize-product-warpper">
    <div class="cu-list" :class="listClass">
      <div
        class="cu-item"
        v-for="(item, index) in form.productList"
        :key="index"
      >
        <div class="sign-warpper" v-if="form.sign">
          <img src="../../../assets/images/common_label2.png" alt />
          <span>{{ form.signTitle }}</span>
        </div>
        <el-image
          :src="require('../../../assets/images/default_banner.png')"
          fit="cover"
        ></el-image>
        <div class="data-warpper">
          <span class="title" v-if="form.title">{{ item.title }}</span>
          <span class="subtitle" v-if="hasSubtitle">{{ item.subtitle }}</span>
          <div class="price-buy">
            <div class="price-warpper">
              <div>
                <span class="price" v-if="form.price"
                  >￥{{ item.price.toFixed(2) }}</span
                >
                <span
                  class="original"
                  v-if="form.original && !form.member && hasPartial"
                  >￥{{ item.original.toFixed(2) }}</span
                >
                <div v-if="form.member && hasPartial">
                  <span class="iconfont icon-huiyuan"></span>
                  <span>会员价</span>
                </div>
              </div>
              <div v-if="form.sales && hasPartial">
                <span>已售{{ item.sales }}</span>
              </div>
            </div>
            <div class="buy-warpper" v-if="form.buyStyle != -1 && hasBuy">
              <span v-if="form.buyStyle === 0" class="style-1">购买</span>
              <span
                v-else-if="form.buyStyle === 1"
                class="el-icon-circle-plus style-2"
              ></span>
              <span v-else class="iconfont style-3 icon-gouwuche"></span>
            </div>
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
      default: () => {}
    }
  },
  computed: {
    //是否具有二级标题
    hasSubtitle() {
      return (
        this.form.subtitle && (this.form.style === 0 || this.form.style === 2)
      );
    },
    //不同样式的class
    listClass() {
      return `listtyle-${this.form.style + 1}`;
    },
    //是否具有部分功能
    hasPartial() {
      return this.form.style >= 3 ? false : true;
    },
    //是否具有购买按钮
    hasBuy() {
      return this.form.style == 5 || this.form.style == 6 ? false : true;
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/theme.scss";
.customize-product-warpper {
  text-align: left;
  padding-top: 10px;
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
  .cu-list.listtyle-2,
  .cu-list.listtyle-4,
  .cu-list.listtyle-5 {
    justify-content: space-between;
    display: flex;
    padding: 0px 10px;
    flex-wrap: wrap;
    .cu-item {
      width: 48%;
    }
  }

  .cu-list.listtyle-7 {
    display: flex;
    overflow: hidden;
    padding-left: 10px;
    .cu-item {
      margin-right: 10px;
      width: 100px;
      flex-shrink: 0;
      .el-image {
        width: 100%;
        height: 100px;
      }
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

  .cu-list.listtyle-1,
  .cu-list.listtyle-3 {
    .cu-item {
      padding: 0px 10px;
      .sign-warpper {
        left: 10px;
      }
    }
  }

  .cu-list.listtyle-3 {
    .cu-item {
      flex-direction: row;
      .el-image {
        width: 105px;
        height: 105px;
        flex-shrink: 0;
      }
      .data-warpper {
        flex: 1;
        justify-content: space-between;
      }
    }
  }

  .cu-list.listtyle-6 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0px 10px;
    .cu-item {
      flex-direction: row;
      width: 48%;
      .el-image {
        width: 90px;
        height: 90px;
        flex-shrink: 0;
      }
      .data-warpper {
        flex: 1;
        justify-content: space-between;
      }
    }
  }
}
</style>
