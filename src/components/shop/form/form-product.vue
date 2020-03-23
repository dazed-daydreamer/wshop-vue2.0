<template>
  <div class="form-product-warpper">
    <div class="component-style">
      <div class="title">
        <span>选择风格</span>
      </div>
      <div class="style-warpper">
        <img :src="styleImg" alt />
        <div class="style-change" @click.stop="styleDialogShow">修改风格</div>
      </div>
    </div>
    <div class="choice-product">
      <div class="title">
        <span>选择商品</span>
      </div>
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
      <div class="title">
        <span>商品排序</span>
      </div>
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
    <div class="component-style">
      <div class="title">
        <span>显示内容</span>
        <span>(划线价和会员价同时选择时，优先显示会员价)</span>
      </div>
      <div class="show-warpper">
        <el-checkbox-group v-model="checkList" @change="showChange">
          <el-checkbox
            :label="item.key"
            v-for="(item,index) in showArr"
            :key="index"
            v-show="checkShow(item)"
          >
            <span>{{item.title}}</span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="buy-warpper" v-show="hasBuy">
      <div class="title">
        <span>购物车按钮</span>
      </div>
      <div class="radio-warpper">
        <el-radio-group v-model="localForm.buyStyle">
          <el-radio :label="0">购买</el-radio>
          <el-radio :label="1">
            <span class="el-icon-circle-plus style-2"></span>
          </el-radio>
          <el-radio :label="2">
            <span class="iconfont icon-gouwuche style-3"></span>
          </el-radio>
          <el-radio :label="-1">
            <span>隐藏</span>
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="sign-warpper">
      <div class="title">
        <span>角标设置</span>
      </div>
      <div class="radio-warpper">
        <el-radio-group v-model="localForm.sign">
          <el-radio :label="false">不显示</el-radio>
          <el-radio :label="true">系统图标</el-radio>
        </el-radio-group>
      </div>
      <div v-if="localForm.sign" class="input-warpper">
        <el-input v-model="localForm.signTitle" size="medium">
          <template slot="prepend">文字</template>
        </el-input>
      </div>
    </div>
    <l-dialog ref="stypeDialog" title="风格选择器" @confirm="styleConfirm" class="dialog">
      <div class="stype-dialog-warpper">
        <ul class="cu-list">
          <li
            v-for="(item,index) in stypeImgArr"
            :key="index"
            class="cu-item"
            :class="{current:styleIndex === index}"
            @click="styleChange(index)"
          >
            <div class="img-warpper">
              <span class="el-icon-success"></span>
              <img :src="require(`assets/images/${
              item
      }`)" alt />
            </div>
            <span>风格{{index+1}}</span>
          </li>
        </ul>
      </div>
    </l-dialog>
  </div>
</template>


<script>
import { shopFormMixins } from "mixins/shop-form-mixins.js";
import LDialog from "../../public/l-dialog.vue";
import { shopComponentsProductInit } from "@/config/shop.js";
export default {
  mixins: [shopFormMixins],
  data() {
    return {
      //风格图片
      styleImg: "",
      //本地表单
      localForm: JSON.parse(JSON.stringify(shopComponentsProductInit)),
      //样式图片数组
      stypeImgArr: [
        "goods,one.png",
        "twoGoods,two.png",
        "goods,list.png",
        "otherGoods,three3.png",
        "otherGoods,three.png",
        "twoGoods,list2.png",
        "otherGoods,three2.png"
      ],
      //排序数组
      sortArr: ["综合", "价格降序", "价格升序", "访问量", "成交转化率"],
      //显示内容多选数组
      checkList: [],
      //显示内容数组
      showArr: [
        {
          title: "商品名称",
          key: "title",
          has: [0, 1, 2, 3, 4, 5, 6]
        },
        {
          title: "商品价格",
          key: "price",
          has: [0, 1, 2, 3, 4, 5, 6]
        },
        {
          title: "划线原价",
          key: "original",
          has: [0, 1, 2]
        },
        {
          title: "商品销量",
          key: "sales",
          has: [0, 1, 2]
        },
        {
          title: "副标题",
          key: "subtitle",
          has: [0, 2]
        },
        {
          title: "会员价",
          key: "member",
          has: [0, 1, 2]
        }
      ],
      //当前风格
      styleIndex: 0
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
      this.initCheckList();
    },
    //获取风格图片
    getStyleImg() {
      this.styleImg = require(`assets/images/${
        this.stypeImgArr[this.localForm.style]
      }`);
    },
    //初始化显示内容多选数组
    initCheckList() {
      let arr = [];
      this.showArr.forEach(item => {
        if (this.localForm[item.key]) {
          arr.push(item.key);
        }
      });
      this.checkList = arr;
    },
    //显示风格选择
    styleDialogShow() {
      this.styleIndex = this.localForm.style;
      this.$refs.stypeDialog.show();
    },
    //改变风格
    //index  改变到当前风格
    styleChange(index) {
      this.styleIndex = index;
    },
    //确认风格
    styleConfirm() {
      this.localForm.style = this.styleIndex;
      this.getStyleImg();
    },
    //显示内容改变
    // arr 显示内容数组
    showChange(arr) {
      this.showArr.forEach(item => {
        const index = arr.findIndex(showItem => item.key === showItem);
        if (index === -1) {
          this.$set(this.localForm, item.key, false);
        } else {
          this.$set(this.localForm, item.key, true);
        }
      });
    },
    //检查该风格是否可以显示
    //item 每个显示内容
    checkShow(item) {
      const index = item.has.findIndex(
        hasItem => hasItem === this.localForm.style
      );
      return index === -1 ? false : true;
    }
  },
  computed: {
    //是否具有购买按钮
    hasBuy() {
      return this.localForm.style == 5 || this.localForm.style == 6
        ? false
        : true;
    }
  },
  components: {
    LDialog
  }
};
</script>



<style lang="scss">
@import "@/styles/theme.scss";
.form-product-warpper {
  text-align: left;
  .radio-warpper {
    margin-top: 20px;
    .el-radio__label {
      font-size: 12px;
    }
  }
  & > div:not(.dialog) {
    padding: 20px 20px;
    border-top: 5px solid #f6f7f9;
    .title {
      font-size: 13px;
      font-weight: bold;
      span:nth-of-type(2) {
        font-size: 12px;
        font-weight: 400;
        margin-left: 5px;
        color: $secondary-text-color;
      }
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
    .sort-introduce {
      margin-top: 20px;
      font-size: 12px;
      .el-select {
        width: 100%;
      }
    }
  }

  .show-warpper {
    .el-checkbox-group {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      .el-checkbox {
        margin-top: 3px;
        margin-right: 0px;
        width: 33%;
        .el-checkbox__label {
          font-size: 13px;
        }
      }
    }
  }

  .buy-warpper {
    .style-2 {
      font-size: 17px;
    }
    .style-3 {
      font-size: 17px;
    }
  }

  .sign-warpper {
    .input-warpper {
      margin-top: 20px;
    }
  }

  .stype-dialog-warpper {
    padding: 16px;
    padding-bottom: 0px;
    .cu-list {
      display: flex;
      flex-wrap: wrap;
      .cu-item {
        cursor: pointer;
        width: 33%;
        text-align: center;
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
        &.current {
          .img-warpper {
            border-color: $theme-color;
            .el-icon-success {
              display: block;
            }
          }
        }
        .img-warpper {
          border-radius: 5px;
          margin: 0px 20px;
          margin-bottom: 10px;
          border: 1px solid $border-color;
          background-color: #f7f8fa;
          position: relative;
          img {
            width: 100%;
          }
          .el-icon-success {
            position: absolute;
            right: 0;
            bottom: 0;
            font-size: 17px;
            transform: translate(50%, 50%);
            color: $theme-color;
            display: none;
          }
        }
        & > span {
          font-size: 13px;
        }
      }
    }
  }
}
</style>