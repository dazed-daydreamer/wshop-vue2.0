<template>
  <div class="form-tab-warpper shop-template-form">
    <div class="list-warpper">
      <div class="title">
        <span>选项卡设置</span>
        <span>(可以拖拽排序)</span>
      </div>
      <draggable
        v-model="localForm.tabList"
        :options="draggableOptions"
        class="cu-list"
        tag="ul"
        @sort="sortChange"
      >
        <li
          v-for="(item, index) in localForm.tabList"
          :key="index"
          class="cu-item"
          :class="{ current: index === localForm.currentTab }"
          @click="itemChoose(index)"
        >
          <span>{{ item.title }}</span>
        </li>
      </draggable>
      <div class="addTab" @click="addTab">+添加</div>
    </div>

    <div class="setting-warpper">
      <div class="title">选项设置</div>
      <div class="setting-box">
        <div class="title-warpper">
          <span>标题</span>
          <el-input
            type="text"
            maxlength="5"
            v-model="currentTitle"
            show-word-limit
            @input="currentTitleChange"
          />
        </div>
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
          :icon="
            localForm.product === 0
              ? 'el-icon-circle-plus-outline'
              : 'el-icon-connection'
          "
        >
          <span v-show="localForm.product === 0">添加</span>
          <span v-show="localForm.product != 0">关联</span>
        </el-button>
      </div>
    </div>

    <div class="setting-product">
      <div class="title">商品设置</div>
      <div class="setting-box">
        <div class="setting-item">
          <span>风格</span>
          <div>
            <el-radio-group v-model="localForm.style">
              <el-radio
                :label="index"
                v-for="(item, index) in styleArr"
                :key="index"
                >{{ item }}</el-radio
              >
            </el-radio-group>
          </div>
        </div>
        <div class="setting-item">
          <span>显示</span>
          <div>
            <el-checkbox-group v-model="checkList" @change="showChange">
              <el-checkbox
                :label="item.key"
                v-for="(item, index) in showArr"
                :key="index"
                v-show="checkShow(item)"
              >
                <span>{{ item.title }}</span>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="setting-item">
          <span>按钮</span>
          <div>
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
        <div class="setting-item sign">
          <span>角标</span>
          <div>
            <div>
              <el-radio-group v-model="localForm.sign">
                <el-radio :label="false">不显示</el-radio>
                <el-radio :label="true">系统图标</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>

        <div v-if="localForm.sign" class="input-warpper">
          <el-input v-model="localForm.signTitle" size="medium">
            <template slot="prepend">文字</template>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { shopComponentsTabInit } from "@/config/shop.js";
import { shopFormMixins } from "mixins/shop-form-mixins.js";
import Draggable from "vuedraggable";
export default {
  mixins: [shopFormMixins],
  data() {
    return {
      //本地表单
      localForm: JSON.parse(JSON.stringify(shopComponentsTabInit)),
      //拖拽设置
      draggableOptions: {
        sort: true,
        disabled: false
      },
      //当前tab的标题
      currentTitle: "",
      //风格数组
      styleArr: ["风格1", "风格2", "风格3", "风格4", "风格5", "风格6", "风格7"],
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
        }
      ],
      //显示内容多选数组
      checkList: []
    };
  },
  props: {
    //父组件传过来的表单
    form: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.currentTitle = this.localForm.tabList[this.localForm.currentTab].title;
    this.initCheckList();
  },
  methods: {
    //选项卡被点击改变当前索引
    itemChoose(index) {
      this.localForm.currentTab = index;
      this.currentTitle = this.localForm.tabList[index].title;
    },
    //添加选显卡
    addTab() {
      this.localForm.tabList.push({
        title: "选项",
        product: [
          {
            title: "这里是商品标题",
            subtitle: "这里是商品副标题",
            price: 20,
            original: 30,
            sales: 0
          }
        ]
      });
    },
    //标题改变的时候
    //val 改变的值
    currentTitleChange(val) {
      const title = this.localForm.tabList[this.localForm.currentTab].title;
      if (title !== val) {
        this.localForm.tabList[this.localForm.currentTab].title = val;
      }
    },
    //当拖拽排序时候触发
    sortChange(evt) {
      const oldIndex = evt.oldIndex;
      const newIndex = evt.newIndex;
      if (
        oldIndex === this.localForm.currentTab ||
        newIndex === this.localForm.currentTab
      ) {
        this.localForm.currentTab =
          this.localForm.currentTab === oldIndex ? newIndex : oldIndex;
      }
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
    }
  },
  components: {
    Draggable
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.form-tab-warpper {
  .radio-warpper {
    margin-top: 20px;
    .el-radio__label {
      font-size: 12px;
    }
  }

  .list-warpper {
    .cu-list {
      border: 1px solid $border-color;
      border-bottom: none;
      border-radius: 5px 5px 0px 0px;
      margin: 0;
      margin-top: 20px;
      .cu-item {
        height: 35px;
        line-height: 35px;
        font-size: 13px;
        padding-left: 20px;
        cursor: pointer;
        &.current {
          border: 1px solid $theme-color !important;
        }
        &:not(:nth-last-of-type(1)) {
          border-bottom: 1px solid $border-color;
        }
      }
    }
    .addTab {
      height: 35px;
      line-height: 35px;
      text-align: center;
      font-size: 13px;
      border: 1px dashed #ccc;
      border-radius: 0px 0px 5px 5px;
    }
  }

  .setting-warpper {
    .setting-box {
      margin-top: 20px;
      background-color: #f6f7f9;
      border: 1px solid $border-color;
      border-radius: 5px;
      .title-warpper {
        margin: 10px 0px;
        height: 35px;
        line-height: 35px;
        font-size: 13px;
        padding: 10px 15px;
        display: flex;
        align-items: center;
        & > span {
          margin-right: 10px;
          width: 30px;
          flex-shrink: 0;
        }
        .el-input {
          .el-input__inner {
            height: 35px;
            line-height: 35px;
            font-size: 13px;
          }
        }
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

  .setting-product {
    .el-radio {
      margin-bottom: 4px;
      .el-radio__label {
        font-size: 12px;
      }
    }
    .el-checkbox {
      margin-top: 3px;
      margin-right: 0px;
      width: 33%;
      .el-checkbox__label {
        font-size: 13px;
      }
    }
    .setting-box {
      margin-top: 20px;
      background-color: #f6f7f9;
      border: 1px solid $border-color;
      border-radius: 5px;
      .setting-item {
        font-size: 13px;
        padding: 10px 15px;
        display: flex;
        margin-top: 10px;
        & > span {
          margin-right: 10px;
          width: 30px;
          flex-shrink: 0;
        }
        & > div {
          flex: 1;
        }
        .sign {
          & > div {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }

    .input-warpper {
      margin: 10px;
      margin-bottom: 20px;
    }
  }
}
</style>
