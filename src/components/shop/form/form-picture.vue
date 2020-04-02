<template>
  <div class="form-picture-warpper shop-template-form">
    <div class="component-style">
      <div class="title">
        <span>选择风格</span>
      </div>
      <div class="style-warpper">
        <img :src="styleImg" alt />
        <div class="style-change" @click.stop="styleDialogShow">修改风格</div>
      </div>
    </div>

    <div class="list-warpper">
      <div class="title">
        <span>添加图片</span>
      </div>
      <div class="tips">建议图片宽度750，高度200-950。</div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in localForm.picture" :key="index">
            <div class="img-warpper">
              <img :src="item.img" alt v-if="item.img" />
              <img src="../../../assets/images/default_banner.png" alt v-else />
              <span>替换</span>
            </div>
            <div class="link-warpper" :class="{'has-url':item.url}">
              <span class="el-icon-link"></span>
              <span v-if="item.url">{{item.url}}</span>
              <span v-else>请选择链接</span>
            </div>
            <el-popconfirm title="确定删除吗？" @onConfirm="delList(index)">
              <span class="el-icon-close" slot="reference"></span>
            </el-popconfirm>
          </li>
        </ul>

        <div class="add-list" @click="addList">
          <span>+添加</span>
        </div>
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
import { shopComponentsPictureInit } from "@/config/shop.js";
export default {
  mixins: [shopFormMixins],
  data() {
    return {
      //风格图片
      styleImg: "",
      //本地表单
      localForm: JSON.parse(JSON.stringify(shopComponentsPictureInit)),
      //样式图片数组
      stypeImgArr: ["picture,style1.png", "twoPicture,style1.png"],
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
    //添加新图片
    addList() {
      this.localForm.picture.push({
        url: "",
        img: ""
      });
    },
    //删除新图片
    delList(index) {
      setTimeout(() => {
        this.localForm.picture.splice(index, 1);
      }, 200);
    }
  },
  components: {
    LDialog
  }
};
</script>


<style lang="scss">
@import "@/styles/theme.scss";
.form-picture-warpper {
  .radio-warpper {
    margin-top: 20px;
    .el-radio__label {
      font-size: 12px;
    }
  }

  .list-warpper {
    .tips {
      margin-top: 20px;
    }

    .list {
      ul {
        margin: 0px;
        li {
          background: #f6f7f9;
          padding: 10px 20px 10px 10px;
          border: 1px solid #eee;
          color: #999;
          position: relative;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          &:hover {
            .el-icon-close {
              display: block;
            }
          }
          .img-warpper {
            width: 50px;
            height: 50px;
            background-color: #fff;
            border: 1px dashed #ededed;
            display: flex;
            align-items: center;
            position: relative;
            cursor: pointer;
            &:hover {
              span {
                display: block;
              }
            }
            img {
              width: 100%;
            }
            span {
              display: none;
              position: absolute;
              bottom: 0px;
              left: 0px;
              background-color: rgba($color: #000000, $alpha: 0.5);
              color: #fff;
              width: 100%;
              font-size: 12px;
              text-align: center;
              padding: 2px 0px;
            }
          }

          .link-warpper {
            background-color: #e8effc;
            padding: 8px 10px;
            margin-left: 14px;
            border-radius: 4px;
            flex: 1;
            font-size: 13px;
            cursor: pointer;
            .el-icon-link {
              font-size: 15px;
              margin-right: 10px;
            }
            &.has-url {
              color: #333;
            }
          }

          .el-icon-close {
            position: absolute;
            right: 3px;
            top: 3px;
            font-size: 15px;
            display: none;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>