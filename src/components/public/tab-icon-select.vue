<template>
  <div class="tab-icon-select-warpper">
    <l-dialog ref="dialog" title="导航图标选择器" @confirm="iconConfirm">
      <div class="tab-icon-select-dialog">
        <div class="category-box">
          <ul>
            <li
              v-for="(item, index) in categoryArr"
              :key="index"
              :class="{ active: index === categoryActive }"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="preview-operate">
          <ul>
            <li
              v-for="(item, index) in iconList"
              :key="index"
              :class="{ active: iconActive === item.icon }"
              @click="changeIcon(item)"
            >
              <span class="iconfont" :class="item.icon"></span>
              <span class="el-icon-success"></span>
            </li>
          </ul>
        </div>
      </div>
    </l-dialog>
  </div>
</template>

<script>
import LDialog from "./l-dialog.vue";
export default {
  data() {
    return {
      //当前分类
      categoryActive: 0,
      //分类数组
      categoryArr: ["全部"],
      //图标列表
      iconList: [
        {
          icon: "icon-fenlei-xianxing"
        },
        {
          icon: "icon-huiyuan2"
        },
        {
          icon: "icon-huiyuan1"
        },
        {
          icon: "icon-fenlei-xuanzhong"
        },
        {
          icon: "icon-tianchongxing-"
        },
        {
          icon: "icon-zhuye"
        },
        {
          icon: "icon-shouye"
        },
        {
          icon: "icon-wode"
        },
        {
          icon: "icon-gouwuche2"
        }
      ],
      //当前图标
      iconActive: "",
      //当前导航
      tabActive: -1
    };
  },
  methods: {
    //显示弹窗
    //icon    当前图标
    //index   当前导航索引值
    show(icon, index) {
      this.iconActive = icon;
      this.$refs.dialog.show();
      this.tabActive = index;
    },
    //改变当前图标
    //item  改变的图标
    changeIcon(item) {
      this.iconActive = item.icon;
    },
    //确认图标
    iconConfirm() {
      this.$emit("confirm", this.iconActive, this.tabActive);
    }
  },
  components: { LDialog }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.tab-icon-select-dialog {
  display: flex;
  height: 100%;
  .category-box {
    width: 180px;
    border-right: 1px solid #e3e2e5;
    height: 473px;
    ul {
      margin: 0px;
      width: 100%;
      margin-top: 20px;
      li {
        height: 35px;
        line-height: 35px;
        border-radius: 4px;
        font-size: 12px;
        padding-left: 10px;
        margin: 0px 20px;
        margin-bottom: 20px;
        cursor: pointer;
        &.active {
          color: $theme-color;
          background-color: rgb(236, 245, 255);
        }
      }
    }
  }
  .preview-operate {
    flex: 1;
    padding: 20px;
    ul {
      margin: 0px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 80px;
        height: 80px;
        border-radius: 4px;
        border: 1px solid #ededed;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        margin-bottom: 20px;
        position: relative;
        cursor: pointer;
        span {
          font-size: 25px;
        }
        &.active {
          border-color: $theme-color;
          .el-icon-success {
            display: block;
          }
        }
        .el-icon-success {
          position: absolute;
          right: 0;
          bottom: 0;
          font-size: 17px;
          transform: translate(50%, 50%);
          color: #2589ff;
          display: none;
        }
      }
    }
  }
}
</style>
