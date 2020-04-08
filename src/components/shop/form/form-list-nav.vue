<template>
  <div class="form-list-nav-warpper shop-template-form">
    <div class="icon-show">
      <div class="title">图标</div>
      <div class="radio-warpper">
        <el-radio v-model="localForm.iconShow" :label="true">显示</el-radio>
        <el-radio v-model="localForm.iconShow" :label="false">隐藏</el-radio>
      </div>
    </div>
    <div class="list-warpper">
      <ul>
        <li v-for="(item,index) in localForm.list" :key="index">
          <el-popconfirm title="确定删除吗？" @onConfirm="delList(index)">
            <span class="el-icon-close" slot="reference"></span>
          </el-popconfirm>
          <div class="item-icon">
            <span>图标</span>
            <div>
              <span class="iconfont" :class="item.icon"></span>
              <span class="replace">替换</span>
            </div>
          </div>
          <div class="item-title">
            <span>标题</span>
            <div>
              <el-input v-model="item.title" size="small"></el-input>
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
</template>

<script>
import { shopComponentsListNavInit } from "@/config/shop.js";
import { shopFormMixins } from "mixins/shop-form-mixins.js";
export default {
  mixins: [shopFormMixins],
  data() {
    return {
      //本地表单
      localForm: JSON.parse(JSON.stringify(shopComponentsListNavInit))
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
    //添加导航列表
    addList() {
      this.localForm.list.push({
        icon: "icon-B",
        title: "文字",
        url: ""
      });
    },
    //删除导航列表
    delList(index) {
      this.localForm.list.splice(index, 1);
    }
  }
};
</script>


<style lang="scss">
.form-list-nav-warpper {
  .el-radio__label {
    font-size: 12px;
  }
  .icon-show {
    .radio-warpper {
      margin-top: 20px;
    }
  }
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
        & > div {
          margin-top: 20px;
          display: flex;
          font-size: 13px;
          align-items: center;
          & > span {
            width: 50px;
            text-align: center;
          }
        }
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
        .item-line {
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

        .item-title{
            display: flex;
            div{
                flex:1;
            }
        }

        .item-icon {
          div {
            width: 50px;
            height: 50px;
            background-color: #fff;
            border-radius: 5px;
            border: 1px solid #eee;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            cursor: pointer;
            &:hover {
              .replace {
                display: block;
              }
            }
            .iconfont {
              font-size: 30px;
            }
            .replace {
              position: absolute;
              bottom: 0px;
              left: 0px;
              height: 20px;
              text-align: center;
              line-height: 20px;
              width: 100%;
              background-color: rgba($color: #000000, $alpha: 0.5);
              color: #fff;
              font-size: 12px;
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>