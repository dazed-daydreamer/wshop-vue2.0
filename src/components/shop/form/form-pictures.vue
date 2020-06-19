<template>
  <div class="form-pictures-warpper shop-template-form">
    <div class="title-style">
      <div class="title">
        <span>主标题</span>
      </div>
      <div class="has-title">
        <el-switch v-model="localForm.title"></el-switch>
        <span>{{ localForm.title === true ? "开启" : "关闭" }}</span>
      </div>
    </div>

    <div class="subtitle-style">
      <div class="title">
        <span>副标题</span>
      </div>
      <div class="has-subtitle">
        <el-switch v-model="localForm.subtitle"></el-switch>
        <span>{{ localForm.subtitle === true ? "开启" : "关闭" }}</span>
      </div>
    </div>

    <div class="title-position">
      <div class="title">文字位置</div>
      <div class="title-change">
        <ul>
          <li
            v-for="(item, index) in titleArr"
            :key="index"
            :class="{ active: index === localForm.alignmentStyle }"
            @click="titleChange(index)"
          >
            <img :src="require(`assets/images/${item}`)" alt />
          </li>
        </ul>
      </div>
    </div>

    <div class="picture-list">
      <div class="title">
        <span>内容设置</span>
      </div>
      <div class="list-warpper">
        <ul>
          <li v-for="(item, index) in localForm.pictureList" :key="index">
            <el-popconfirm title="确定删除吗？" @onConfirm="delList(index)">
              <span class="el-icon-close" slot="reference"></span>
            </el-popconfirm>
            <div class="item-main">
              <div>
                <el-image
                  :src="item.img"
                  fit="cover"
                  v-if="item.img"
                ></el-image>
                <el-image
                  :src="require('../../../assets/images/default_picture.png')"
                  fit="cover"
                  v-else
                ></el-image>
                <div class="replace">
                  <span>替换</span>
                </div>
              </div>
              <div>
                <div>
                  <span>主标题</span>
                  <el-input v-model="item.title" size="mini"></el-input>
                </div>
                <div>
                  <span>副标题</span>
                  <el-input v-model="item.subtitle" size="mini"></el-input>
                </div>
              </div>
            </div>
            <div class="item-line">
              <span>链接</span>
              <div>
                <span class="el-icon-connection"></span>
                <span>请选择链接</span>
              </div>
            </div>
          </li>
        </ul>

        <div class="add-list" @click="addList">
          <span>+添加</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { shopComponentsPicturesInit } from "@/config/shop.js";
import { shopFormMixins } from "mixins/shop-form-mixins.js";
export default {
  mixins: [shopFormMixins],
  data() {
    return {
      //本地表单
      localForm: JSON.parse(JSON.stringify(shopComponentsPicturesInit)),
      //文字位置
      titleArr: ["left.png", "center.png"]
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
    //文字位置改变
    titleChange(index) {
      this.localForm.alignmentStyle = index;
    },
    //添加内容列表
    addList() {
      this.localForm.pictureList.push({
        title: "这里是主标题",
        subtitle: "这里是副标题",
        url: "",
        img: ""
      });
    },
    //删除内容列表
    delList(index) {
      setTimeout(() => {
        this.localForm.pictureList.splice(index, 1);
      }, 200);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.form-pictures-warpper {
  .title-style,
  .subtitle-style {
    .has-title,
    .has-subtitle {
      margin-top: 20px;
      font-size: 13px;
      display: flex;
      align-items: center;
      & > span {
        margin-left: 10px;
      }
    }
  }

  .title-position {
    .title-change {
      margin-top: 20px;
      ul {
        margin: 0px;
        display: flex;
        li {
          border: 1px solid transparent;
          margin: 0px 10px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 5px;
          &.active {
            border-color: $theme-color;
          }
        }
      }
    }
  }

  .picture-list {
    .list-warpper {
      margin-top: 20px;
      ul {
        margin: 0px;
        li {
          margin-bottom: 20px;
          background: #f6f7f9;
          padding: 15px 10px;
          border: 1px solid #eee;
          color: #999;
          position: relative;
          border-radius: 4px;
          &:hover {
            .el-icon-close {
              display: block;
            }
          }
          .el-icon-close {
            position: absolute;
            top: 4px;
            right: 4px;
            font-size: 14px;
            cursor: pointer;
            display: none;
          }
          .item-main {
            display: flex;
            align-items: center;
            & > div:nth-of-type(1) {
              position: relative;
              width: 80px;
              height: 80px;
              border: 1px solid #ededed;
              cursor: pointer;
              &:hover {
                .replace {
                  display: block;
                }
              }
              .el-image {
                width: 80px;
                height: 80px;
              }
              .replace {
                display: none;
                width: 100%;
                position: absolute;
                bottom: 0px;
                left: 0px;
                height: 20px;
                line-height: 20px;
                background-color: rgba($color: #000000, $alpha: 0.5);
                color: #fff;
                font-size: 12px;
                text-align: center;
              }
            }

            & > div:nth-of-type(2) {
              margin-left: 20px;
              & > div {
                display: flex;
                align-items: center;
                &:nth-of-type(1) {
                  margin-bottom: 10px;
                }
                & > span {
                  font-size: 13px;
                  margin-right: 10px;
                }
                .el-input {
                  width: 150px;
                }
              }
            }
          }
          .item-line {
            margin-top: 20px;
            display: flex;
            font-size: 13px;
            align-items: center;
            & > span {
              width: 50px;
              text-align: center;
            }
            & > div {
              flex: 1;
              border-radius: 4px;
              background-color: #e8effc;
              cursor: pointer;
              padding: 8px 12px;
              span:nth-of-type(1) {
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
