<template>
  <div class="customize-ranking-warpper">
    <div class="title" v-if="form.titleShow">
      <div class="line"></div>
      <span>{{ form.title }}</span>
      <div class="line"></div>
    </div>
    <div class="product-list">
      <ul class="cu-list" :class="listClass">
        <li class="cu-item" v-for="item in form.count" :key="item">
          <el-image
            :src="require('../../../assets/images/default_picture.png')"
            fit="cover"
          ></el-image>
          <div class="data-warpper">
            <div class="title">{{ productItem.title }}</div>
            <div class="price">
              <span>￥{{ productItem.price }}</span>
              <span v-if="form.style === 0">￥{{ productItem.original }}</span>
            </div>
            <div class="buy" v-if="form.style === 0">
              <div>
                <span>已售</span>
                <span>{{ productItem.sales }}</span>
              </div>
              <span>购买</span>
            </div>
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
      default: () => {}
    }
  },
  data() {
    return {
      productItem: {
        title: "这里是商品标题",
        subtitle: "这里是商品副标题",
        price: 20,
        original: 30,
        sales: 0
      }
    };
  },
  computed: {
    //不同样式的class
    listClass() {
      return `listtyle-${this.form.style + 1}`;
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/theme.scss";
.customize-ranking-warpper {
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
      margin-bottom: 20px;
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

  .cu-list.listtyle-2 {
    .cu-item {
      display: flex;
      .el-image {
        width: 80px;
        height: 80px;
      }
      .data-warpper {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          margin: 0;
        }
      }
    }
  }
}
</style>
