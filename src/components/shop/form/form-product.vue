<template>
  <div class="form-product-warpper">
    <div class="component-style">
      <div class="title">选择风格</div>
      <div class="style-warpper">
        <img :src="styleImg" alt />
        <div class="style-change" @click.stop="changeStyle">修改风格</div>
      </div>
    </div>
    <div class="choice-product">
      <div class="title">选择商品</div>
      <div class="radio-warpper">
        <el-radio-group v-model="localForm.product">
          <el-radio :label="0">手动选择</el-radio>
          <el-radio :label="1">选择分类</el-radio>
          <el-radio :label="2">选择分组</el-radio>
        </el-radio-group>
      </div>
      <div class="product-warpper">
        <el-button
          type="primary"
          :icon=" localForm.product === 0 ?'el-icon-circle-plus-outline' :'el-icon-connection'"
        >
          <span v-show="localForm.product === 0">添加</span>
          <span v-show="localForm.product != 0">关联</span>
        </el-button>
      </div>
    </div>
    <div class="sort-warpper">
      <div class="title">商品排序</div>
      <div class="radio-warpper">
        <el-radio-group v-model="localForm.sort">
          <el-radio :label="0">千人千面</el-radio>
          <el-radio :label="1">自定义排序</el-radio>
        </el-radio-group>
      </div>
      <div class="sort-introduce">
        <div v-show="localForm.sort === 0">根据会员特征千人千面展现，可大幅提升点击和成交转化率</div>
        <div v-show="localForm.sort === 1">
          <el-select v-model="localForm.sortType" placeholder="请选择">
            <el-option v-for="(item,index) in sortArr" :key="index" :label="item" :value="index"></el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { shopFormMixins } from "mixins/shop-form-mixins.js";
export default {
  mixins: [shopFormMixins],
  data() {
    return {
      //风格图片
      styleImg: "",
      //本地表单
      localForm: {
        style: 0,
        productList: [],
        original: false,
        buyStyle: 0,
        title: true,
        subtitle: true,
        price: true,
        sales: true,
        member: true,
        sign: "",
        product: 0,
        sort: 0,
        sortType: 0
      },
      //样式图片数组
      stypeImgArr: [
        "goods,one.png",
        "twoGoods,two.png",
        "goods,list.png",
        "otherGoods,three3.png",
        "otherGoods,three.png",
        "otherGoods,three2.png"
      ],
      //排序数组
      sortArr: ["综合", "价格降序", "价格升序", "访问量", "成交转化率"]
    };
  },
  props: {
    //父组件传过来的表单
    form: {
      type: Object,
      default: {}
    }
  },
  methods: {
    //初始化表单
    _initForm() {
      this.getStyleImg();
    },
    //获取风格图片
    getStyleImg() {
      this.styleImg = require(`assets/images/${
        this.stypeImgArr[this.localForm.style]
      }`);
    },
    //改变风格
    changeStyle() {}
  }
};
</script>



<style lang="scss">
.form-product-warpper {
  text-align: left;
  & > div {
    padding: 20px 20px;
    border-top: 5px solid #f6f7f9;
    .title {
      font-size: 13px;
      font-weight: bold;
    }
  }
  .component-style {
    .style-warpper {
      margin-top: 20px;
      border-radius: 5px;
      background: #f6f7f9;
      border: 1px solid #eee;
      text-align: center;
      position: relative;
      .style-change {
        position: absolute;
        cursor: pointer;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 35px;
        line-height: 35px;
        background-color: rgba($color: #000000, $alpha: 0.4);
        color: #fff;
        font-size: 14px;
      }
    }
  }
  .choice-product {
    .radio-warpper {
      margin-top: 20px;
      .el-radio__label {
        font-size: 12px;
      }
    }
    .product-warpper {
      margin-top: 20px;
      text-align: center;
      button {
        font-size: 14px;
        width: 330px;
        span {
          margin-left: 7px;
        }
      }
    }
  }
  .sort-warpper {
    .radio-warpper {
      margin-top: 20px;
      .el-radio__label {
        font-size: 12px;
      }
    }
    .sort-introduce {
      margin-top: 20px;
      font-size: 12px;
      .el-select{
          width: 100%;
      }
    }
  }
}
</style>