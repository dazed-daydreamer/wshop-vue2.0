<template>
  <div class="form-ranking-warpper  shop-template-form">
    <div class="component-style">
      <div class="title">
        <span>选择风格</span>
      </div>
      <div class="style-warpper">
        <img :src="styleImg" alt />
        <div class="style-change" @click.stop="styleDialogShow">修改风格</div>
      </div>
    </div>
    <div class="title-style">
      <div class="tips">展示店铺前三个热销商品排行，可展示整店热销商品，也可以是某个类目的热销商品，快速引导消费者购买店铺爆款。</div>
      <div class="title">
        <span>标题</span>
      </div>
      <div class="style-warpper">
        <div class="radio-warpper">
          <el-radio v-model="localForm.titleShow" :label="true">显示</el-radio>
          <el-radio v-model="localForm.titleShow" :label="false">隐藏</el-radio>
        </div>
        <div class="title-warpper">
          <span>文字</span>
          <el-input
            type="text"
            placeholder="请输入内容"
            v-model="localForm.title"
            maxlength="8"
            show-word-limit
          ></el-input>
        </div>
      </div>
    </div>
    <div class="classify-warpper">
      <div class="title">
        <span>商品分类</span>
      </div>
      <div class="classify-select">
        <el-select v-model="localForm.classify" placeholder="请选择">
          <el-option
            v-for="item in classifyList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="count-warpper">
      <div class="title">
        <span>显示条数</span>
      </div>
      <div class="slider-warpper">
        <el-slider v-model="localForm.count" :min="1" :max="20"></el-slider>
        <span>{{localForm.count}}</span>
      </div>
    </div>
    <div class="keyWord-warpper">
      <div class="title">
        <span>关键词</span>
      </div>
      <div class="keyWord-input">
        <el-input v-model="localForm.keyWord" placeholder="请输入关键词" maxlength="20" show-word-limit></el-input>
      </div>
    </div>
    <div class="price-warpper">
      <div class="title">
        <span>过滤价格</span>
      </div>
      <div class="price-input">
        <el-input v-model="localForm.ceiling" placeholder="请输入">
          <template slot="append">元</template>
        </el-input>
        <span>-</span>
        <el-input v-model="localForm.floor" placeholder="请输入">
          <template slot="append">元</template>
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
import { shopComponentsRankingInit } from "@/config/shop.js";
import { shopFormMixins } from "mixins/shop-form-mixins.js";
import LDialog from "../../public/l-dialog.vue";
export default {
  mixins: [shopFormMixins],
  data() {
    return {
      //风格图片
      styleImg: "",
      //本地表单
      localForm: JSON.parse(JSON.stringify(shopComponentsRankingInit)),
      //样式图片数组
      stypeImgArr: ["twoGoods,two.png", "twoGoods,list2.png"],
      //当前风格
      styleIndex: 0,
      //分类列表
      classifyList: [
        {
          id: 0,
          title: "全部商品"
        }
      ]
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
  },
  components: {
    LDialog
  }
};
</script>


<style lang="scss">
@import "@/styles/theme.scss";
.form-ranking-warpper {
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
  .classify-warpper {
    .classify-select {
      margin-top: 20px;
      .el-select {
        width: 100%;
      }
    }
  }
  .title-style {
    .style-warpper {
      margin-top: 20px;
      .radio-warpper {
        .el-radio__label {
          font-size: 12px;
        }
      }
      .title-warpper {
        margin-top: 20px;
        display: flex;
        align-items: center;
        span {
          width: 50px;
          flex-shrink: 0;
          font-size: 12px;
        }
      }
    }
  }

  .count-warpper {
    .slider-warpper {
      display: flex;
      align-items: center;
      margin-top: 10px;
      .el-slider {
        margin-left: 10px;
        width: 200px;
        flex-shrink: 0;
      }
      span {
        width: 56px;
        margin-left: 20px;
        background: #f6f7f9;
        text-align: center;
        height: 26px;
        line-height: 26px;
        border-radius: 5px;
        font-size: 12px;
      }
    }
  }

  .keyWord-warpper {
    .keyWord-input {
      margin-top: 20px;
    }
  }

  .price-warpper {
    .price-input {
      display: flex;
      align-items: center;
      margin-top: 20px;
      & > span {
        margin: 0px 10px;
      }
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