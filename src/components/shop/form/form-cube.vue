<template>
  <div class="form-cube-warpper shop-template-form">
    <div class="component-style">
      <div class="title">
        <span>选择风格</span>
      </div>
      <div class="style-warpper">
        <img :src="styleImg" alt />
        <div class="style-change" @click.stop="styleDialogShow">修改风格</div>
      </div>
    </div>

    <div class="cube-layout">
      <div class="title">
        <span>魔方布局</span>
      </div>
      <div class="setting-layout">
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
import { shopComponentsCubeInit } from "@/config/shop.js";
import { shopFormMixins } from "mixins/shop-form-mixins.js";
import LDialog from "../../public/l-dialog.vue";
export default {
  mixins: [shopFormMixins],
  data() {
    return {
      //本地表单
      localForm: JSON.parse(JSON.stringify(shopComponentsCubeInit)),
      //风格图片
      styleImg: "",
      //样式图片数组
      stypeImgArr: [
        "cube,custom.png",
        "cube,style1.png",
        "cube,style2.png",
        "cube,style3.png",
        "cube,style4.png",
        "cube,style5.png",
        "cube,style6.png",
        "cube,style7.png",
        "cube,style8.png",
        "cube,style9.png",
        "cube,style10.png"
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
    }
  },
  components: {
    LDialog
  }
};
</script>


<style lang="scss">
.form-cube-warpper {
}
</style>