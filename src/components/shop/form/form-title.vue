<template>
  <div class="form-title-warpper shop-template-form">
    <div class="component-style">
      <div class="title">
        <span>选择风格</span>
      </div>
      <div class="style-warpper">
        <img :src="styleImg" alt />
        <div class="style-change" @click.stop="styleDialogShow">修改风格</div>
      </div>
    </div>

    <div class="main-title-style" v-show="mainTileShow">
      <div class="title">主标题</div>
      <div class="style-content">
        <div>
          <span>颜色</span>
          <el-color-picker
            v-model="localForm.maintitle.color"
            @change="colorChange($event, 'main')"
          ></el-color-picker>
          <span>{{ localForm.maintitle.color }}</span>
        </div>
        <div>
          <span>字号</span>
          <el-slider
            v-model="localForm.maintitle.fontSize"
            :max="20"
            :min="14"
          ></el-slider>
          <span>{{ localForm.maintitle.fontSize }}px</span>
        </div>
        <div>
          <span>其他</span>
          <el-checkbox v-model="localForm.maintitle.bold">加粗</el-checkbox>
          <el-checkbox v-model="localForm.maintitle.tilt">倾斜</el-checkbox>
        </div>
        <div>
          <span>内容</span>
          <el-input v-model="localForm.maintitle.title" size="small"></el-input>
        </div>
      </div>
    </div>

    <div class="sub-title-style" v-if="subTileShow">
      <div class="title">副标题</div>
      <div class="style-content">
        <div>
          <span>启用</span>
          <el-radio v-model="localForm.subtitle.show" :label="true"
            >是</el-radio
          >
          <el-radio v-model="localForm.subtitle.show" :label="false"
            >否</el-radio
          >
        </div>
        <div>
          <span>颜色</span>
          <el-color-picker
            v-model="localForm.subtitle.color"
            @change="colorChange($event, 'main')"
          ></el-color-picker>
          <span>{{ localForm.subtitle.color }}</span>
        </div>
        <div>
          <span>字号</span>
          <el-slider
            v-model="localForm.subtitle.fontSize"
            :max="14"
            :min="12"
          ></el-slider>
          <span>{{ localForm.subtitle.fontSize }}px</span>
        </div>
        <div>
          <span>内容</span>
          <el-input v-model="localForm.subtitle.title" size="small"></el-input>
        </div>
      </div>
    </div>

    <div class="more-btn-style" v-if="subTileShow">
      <div class="title">“更多”按钮设置</div>
      <div class="style-content">
        <div>
          <span>启用</span>
          <el-radio v-model="localForm.more.show" :label="true">是</el-radio>
          <el-radio v-model="localForm.more.show" :label="false">否</el-radio>
        </div>
        <div>
          <span>内容</span>
          <el-input
            v-model="localForm.more.title"
            size="small"
            maxlength="4"
            show-word-limit
          ></el-input>
        </div>
        <div>
          <span>链接</span>
          <div class="link">
            <span class="el-icon-link"></span>
            <span v-if="localForm.more.url">{{ localForm.more.url }}</span>
            <span v-else>请选择链接</span>
          </div>
        </div>
      </div>
    </div>

    <div class="color-style" v-show="ordinaryTitleShow">
      <div class="title">
        <span>颜色选择</span>
      </div>
      <div class="color-select">
        <div>
          <span>标题</span>
          <el-color-picker
            v-model="localForm.maintitle.color"
            @change="colorChange($event, 'main')"
          ></el-color-picker>
          <span>{{ localForm.maintitle.color }}</span>
        </div>
      </div>
    </div>

    <div class="padding-warpper">
      <div class="title">上下边距</div>
      <div class="change-padding">
        <el-slider v-model="localForm.margin" :max="50"></el-slider>
        <span>{{ localForm.margin }}px</span>
      </div>
    </div>

    <div class="title-text" v-show="ordinaryTitleShow">
      <div class="title">标题文字</div>
      <div class="text-warpper">
        <span>文字</span>
        <el-input
          v-model="localForm.maintitle.title"
          size="small"
          maxlength="8"
          show-word-limit
        ></el-input>
      </div>
    </div>

    <l-dialog
      ref="stypeDialog"
      title="风格选择器"
      @confirm="styleConfirm"
      class="dialog"
    >
      <div class="stype-dialog-warpper">
        <ul class="cu-list">
          <li
            v-for="(item, index) in stypeImgArr"
            :key="index"
            class="cu-item"
            :class="{ current: styleIndex === index }"
            @click="styleChange(index)"
          >
            <div class="img-warpper">
              <span class="el-icon-success"></span>
              <img :src="require(`assets/images/${item}`)" alt />
            </div>
            <span>风格{{ index + 1 }}</span>
          </li>
        </ul>
      </div>
    </l-dialog>
  </div>
</template>

<script>
import { shopComponentsTitleInit } from "@/config/shop.js";
import { shopFormMixins } from "mixins/shop-form-mixins.js";
import LDialog from "../../public/l-dialog.vue";
export default {
  mixins: [shopFormMixins],
  data() {
    return {
      //风格图片
      styleImg: "",
      //本地表单
      localForm: JSON.parse(JSON.stringify(shopComponentsTitleInit)),
      //样式图片数组
      stypeImgArr: [
        "title2,title4.png",
        "title2,title1.png",
        "title2,title2.png",
        "title2,title3.png",
        "title,title1.png",
        "title,title2.png",
        "title,title3.png",
        "title,title4.png",
        "title,title5.png",
        "title,title6.png",
        "title,title12.png",
        "title,title13.png"
      ],
      //当前风格
      styleIndex: 0
    };
  },
  props: {
    //父组件传过来的表单
    form: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    //初始化表单
    _initForm() {
      this.getStyleImg();
      this._initStyle();
    },
    //颜色改变的时候，清空变白色
    colorChange(evt, key) {
      if (evt == null) {
        this.localForm[key] = "#FFFFFF";
      }
    },
    //初始化不同风格的样式
    _initStyle() {
      switch (this.localForm.style) {
        case 0:
          this.localForm = {
            style: 0,
            maintitle: {
              color: "#f1ff9a",
              title: "夏日纳凉精选",
              bold: true,
              fontSize: 19,
              tilt: false
            },
            margin: 5
          };
          break;
        case 1:
          this.localForm = {
            style: 1,
            maintitle: {
              color: "#3b2be7",
              title: "为您推荐",
              bold: true,
              fontSize: 19,
              tilt: false
            },
            subtitle: {
              show: true,
              color: "#b7bcd2",
              title: "夏日清爽出行必备",
              fontSize: 14
            },
            more: {
              show: true,
              title: "查看更多",
              url: ""
            },
            margin: 5
          };
          break;
        case 2:
          this.localForm = {
            style: 2,
            maintitle: {
              color: "#ff95ac",
              title: "为您推荐",
              bold: true,
              fontSize: 19,
              tilt: false
            },
            subtitle: {
              show: true,
              color: "#b7bcd2",
              title: "夏日清爽出行必备",
              fontSize: 14
            },
            more: {
              show: true,
              title: "查看更多",
              url: ""
            },
            margin: 5
          };
          break;
        case 3:
          this.localForm = {
            style: 3,
            maintitle: {
              color: "#ff3b3b",
              title: "为您推荐",
              bold: true,
              fontSize: 19,
              tilt: false
            },
            subtitle: {
              show: true,
              color: "#ffb2b2",
              title: "夏日清爽出行必备",
              fontSize: 14
            },
            more: {
              show: true,
              title: "查看更多",
              url: ""
            },
            margin: 5
          };
          break;
        default:
          this.localForm = {
            style: this.localForm.style,
            maintitle: {
              color: "#333333",
              title: "标题栏"
            },
            margin: 5
          };
          break;
      }
    },
    //确认风格
    styleConfirm() {
      this.localForm.style = this.styleIndex;
      this.getStyleImg();
      this._initStyle();
    }
  },
  computed: {
    //一般样式的显示
    ordinaryTitleShow() {
      return this.localForm.style >= 4;
    },
    //主标题的显示
    mainTileShow() {
      return this.localForm.style < 4;
    },
    //副标题的显示
    subTileShow() {
      return this.localForm.style < 4 && this.localForm.style > 0;
    }
  },
  components: {
    LDialog
  }
};
</script>

<style lang="scss" scoped>
.form-title-warpper {
  .main-title-style,
  .sub-title-style,
  .more-btn-style {
    .style-content {
      margin-top: 20px;
      & > div {
        display: flex;
        align-items: center;
        margin-top: 10px;
        height: 30px;
        & > span:nth-of-type(1) {
          font-size: 13px;
          width: 50px;
          text-align: center;
          margin-left: 20px;
        }
        & > .el-color-picker {
          height: 30px;
          .el-color-picker__trigger {
            height: 30px;
            width: 56px;
          }
        }
        & > span:nth-of-type(2) {
          width: 56px;
          margin-left: 20px;
          background: #f6f7f9;
          text-align: center;
          height: 26px;
          line-height: 26px;
          border-radius: 5px;
          font-size: 12px;
        }
        & > .el-slider {
          width: 180px;
        }

        & > .el-input {
          width: 190px;
        }

        & > .link {
          background-color: #e8effc;
          padding: 8px 10px;
          width: 170px;
          border-radius: 4px;
          font-size: 13px;
          cursor: pointer;
          color: #999;
          .el-icon-link {
            font-size: 15px;
            margin-right: 10px;
          }
          &.has-url {
            color: #333;
          }
        }
      }
    }
  }
  .title-text {
    .text-warpper {
      display: flex;
      margin-top: 20px;
      align-items: center;
      & > span {
        font-size: 13px;
        width: 50px;
        text-align: center;
        margin-left: 20px;
      }
      .el-input {
        width: 200px;
      }
    }
  }
}
</style>
