<template>
  <div class="form-like-warpper shop-template-form">
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
      <div class="tips">该模块商品由系统根据算法自动展示，无需编辑</div>
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
    <div class="count-warpper">
      <div class="title">
        <span>显示条数</span>
      </div>
      <div class="slider-warpper">
        <el-slider v-model="localForm.count" :min="1" :max="20"></el-slider>
        <span>{{localForm.count}}</span>
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
import { shopComponentsLikeInit } from "@/config/shop.js";
import { shopFormMixins } from "mixins/shop-form-mixins.js";
import LDialog from "../../public/l-dialog.vue";
export default {
  mixins: [shopFormMixins],
  data() {
    return {
      //风格图片
      styleImg: "",
      //本地表单
      localForm: JSON.parse(JSON.stringify(shopComponentsLikeInit)),
      //样式图片数组
      stypeImgArr: ["twoGoods,two.png", "twoGoods,list2.png"],
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
    },
  },
  components: {
    LDialog
  }
};
</script>


<style lang="scss">
@import "@/styles/theme.scss";
.form-like-warpper {
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
}
</style>