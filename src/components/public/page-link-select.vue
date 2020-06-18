<template>
  <div class="page-link-select-warpper">
    <l-dialog ref="dialog" title="页面链接选择器" @confirm="iconConfirm">
      <div class="page-link-select-dialog">
        <div class="category-box">
          <ul>
            <li
              v-for="(item, index) in categoryArr"
              :key="index"
              :class="{ active: index === categoryActive }"
              @click="categoryChange(index)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="preview-operate">
          <div class="header">
            <div class="title">
              页面名称
            </div>
            <div class="operating">
              操作
            </div>
          </div>
          <div class="cu-list">
            <ul>
              <li v-for="(item, index) in pageLinks" :key="index">
                <div class="title">{{ item.urlTitle }}</div>
                <div class="operating">
                  选择链接
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </l-dialog>
  </div>
</template>

<script>
import LDialog from "./l-dialog.vue";
import { getPageLinke } from "@/api/http.js";
export default {
  data() {
    return {
      //当前分类
      categoryActive: 0,
      //分类数组
      categoryArr: ["功能页面", "装修页面"],
      //当前链接
      linkActive: "",
      //当前导航
      tabActive: -1,
      //装修页面链接
      decoration: [],
      //功能页面链接
      features: [],
      //当前分类页面链接
      pageLinks: []
    };
  },
  created() {
    this._getPageLinke();
  },

  methods: {
    //获取页面链接
    async _getPageLinke() {
      const res = await getPageLinke();
      this.decoration = res.data.decoration;
      this.features = res.data.features;
      this.categoryChange(0);
    },
    //显示弹窗
    show(link, index) {
      this.linkActive = link;
      this.$refs.dialog.show();
      this.tabActive = index;
    },
    //确认图标
    iconConfirm() {
      this.$emit("confirm", this.linkActive, this.tabActive);
    },
    //分类选择
    //index  分类索引值
    categoryChange(index) {
      this.categoryActive = index;
      if (index === 0) {
        this.pageLinks = this.features;
      } else {
        this.pageLinks = this.decoration;
      }
    }
  },
  components: {
    LDialog
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.page-link-select-dialog {
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
    .header {
      display: flex;
      height: 40px;
      background: #f7f7f7;
      padding: 0 12px;
      border-radius: 5px;
      align-items: center;
      .title {
        flex: 1;
        text-align: left;
        font-weight: bold;
        font-size: 14px;
      }
      .operating {
        width: 90px;
        flex-shrink: 0;
        text-align: left;
        font-weight: bold;
        font-size: 14px;
      }
    }
    .cu-list {
      ul {
        li {
          margin-top: 10px;
          height: 40px;
          align-items: center;
          display: flex;
          border: 1px solid #ededed;
          padding: 0 12px;
          border-radius: 5px;
          .title {
            flex: 1;
            text-align: left;
            font-size: 14px;
          }
          .operating {
            width: 90px;
            flex-shrink: 0;
            text-align: left;
            font-size: 13px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
