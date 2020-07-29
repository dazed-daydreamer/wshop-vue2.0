<template>
  <main-scroll>
    <div class="shop-navigation-warpper public-warpper">
      <div class="gray-bg-warpper">
        <div class="show-warpper">
          <img src="../../assets/images/phone-top.png" alt />
          <div class="blank-warpper"></div>
          <div class="tab-list-warpper">
            <ul>
              <li v-for="(item, index) in navIcons" :key="index">
                <span class="iconfont" :class="item.icon"></span>
                <span class="title">{{ item.title }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="operating-warpper">
          <div class="tab-color-warpper">
            <span>导航配色</span>
            <div class="color-dot-warpper">
              <div :style="{ 'background-color': activeColor }"></div>
              <div :style="{ 'background-color': unactiveColor }"></div>
            </div>
            <el-popover placement="bottom" v-model="popoverVisible">
              <div class="color-popover-warpper">
                <div class="title">图标选中状态</div>
                <div class="color-select-warpper">
                  <span>未选中</span>
                  <ul>
                    <li
                      v-for="(item, index) in activeColorList"
                      :key="index"
                      @click="colorChange(item, 'activeColor')"
                    >
                      <div
                        :style="{ 'background-color': item }"
                        :class="{ selecting: activeColor === item }"
                      >
                        <span class="el-icon-check"></span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="color-select-warpper">
                  <span>选中</span>
                  <ul>
                    <li
                      v-for="(item, index) in unactiveColorList"
                      :key="index"
                      @click="colorChange(item, 'unactiveColor')"
                    >
                      <div
                        :style="{ 'background-color': item }"
                        :class="{ selecting: unactiveColor === item }"
                      >
                        <span class="el-icon-check"></span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <el-button type="text" slot="reference">修改</el-button>
            </el-popover>
          </div>
          <div class="tab-list-warpeer">
            <ul>
              <li v-for="(item, index) in navIcons" :key="index">
                <div>
                  <span>导航{{ index + 1 }}</span>
                  <span class="el-icon-close" @click="delTabItem(index)"></span>
                </div>
                <div>
                  <el-form
                    ref="form"
                    :model="item"
                    label-width="60px"
                    :rules="rules"
                  >
                    <el-form-item
                      label="名称"
                      hide-required-asterisk
                      prop="title"
                    >
                      <el-input
                        v-model="item.title"
                        placeholder="请输入内容"
                        size="small"
                        maxlength="4"
                        show-word-limit
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="链接">
                      <div
                        class="select-url-warpper"
                        @click="selectLinkShow(item, index)"
                      >
                        <span v-if="index === 0">首页</span>
                        <el-button plain size="small" v-else>
                          <div class="select-url-button">
                            <span>{{ item.urlTitle }}</span>
                            <span>修改</span>
                          </div>
                        </el-button>
                      </div>
                    </el-form-item>
                    <el-form-item label="图标">
                      <span
                        class="select-icon-btn"
                        @click="selectIconShow(item, index)"
                        >选择图标</span
                      >
                    </el-form-item>
                  </el-form>
                </div>
                <div>
                  <div>
                    <span
                      class="iconfont"
                      :class="item.icon"
                      :style="{ color: unactiveColor }"
                    ></span>
                  </div>
                  <div>
                    <span
                      class="iconfont"
                      :class="item.icon"
                      :style="{ color: activeColor }"
                    ></span>
                  </div>
                </div>
              </li>
            </ul>

            <div
              class="add-tab-button"
              @click="addTabItem"
              :class="{ hide: navIcons.length >= 5 }"
            >
              <span>添加导航</span>
            </div>
          </div>
        </div>
      </div>
      <tab-icon-select
        ref="tabIconSelect"
        @confirm="selectIconConfirm"
      ></tab-icon-select>

      <page-link-select
        ref="pageLinkSelect"
        @confirm="selectLinkConfirm"
      ></page-link-select>
    </div>
    <div class="footer-btn" slot="footer">
      <div>
        <el-button type="primary" size="medium" @click="releaseTab"
          >发布</el-button
        >
        <el-button plain size="medium" @click="saveTab">保存</el-button>
      </div>
    </div>
  </main-scroll>
</template>

<script>
import TabIconSelect from "@/components/public/tab-icon-select.vue";
import PageLinkSelect from "@/components/public/page-link-select.vue";
import MainScroll from "components/public/main-scroll.vue";
import { getPageTabbar } from "@/api/http.js";
export default {
  data() {
    return {
      //页面上的tab图标和标题
      navIcons: [],
      //当前选中颜色
      activeColor: "#ff5050",
      //当前未选中颜色
      unactiveColor: "#5A5A5D",
      //选中颜色列表
      activeColorList: ["#ff5050", "#FF7DAC", "#FF8B0F", "#454545"],
      //未选中颜色列表
      unactiveColorList: ["#5A5A5D"],
      //颜色弹框显示
      popoverVisible: false,
      //验证规则
      rules: {
        title: [{ required: true, message: "必须填写名称", trigger: "blur" }]
      }
    };
  },
  created() {
    this._getPageTabbar();
  },
  methods: {
    //获取页面导航
    async _getPageTabbar() {
      const res = await getPageTabbar();
      this.navIcons = res.data;
    },
    //导航颜色改变
    // color  颜色
    // status  未选中还是选中状态
    colorChange(color, status) {
      if (status == "activeColor") {
        this.activeColor = color;
      } else {
        this.unactiveColor = color;
      }
      this.popoverVisible = false;
    },
    //添加导航
    addTabItem() {
      this.navIcons.push({
        icon: "",
        title: "",
        url: "",
        urlTitle: ""
      });
    },
    //删除导航
    // index  导航的索引值
    delTabItem(index) {
      if (this.navIcons.length > 2) {
        this.navIcons.splice(index);
      }
    },
    //图标选择显示
    //item  导航的具体值
    //index  导航的索引值
    selectIconShow(item, index) {
      this.$refs.tabIconSelect.show(item.icon, index);
    },
    //图标选择确认
    //icon     导航图标
    //index    导航索引值
    selectIconConfirm(icon, index) {
      this.navIcons[index].icon = icon;
    },
    //页面链接显示
    //item   导航具体值
    //index  导航索引值
    selectLinkShow(item, index) {
      this.$refs.pageLinkSelect.show(
        {
          url: item.url,
          urlTitle: item.urlTitle
        },
        index
      );
    },
    //链接选择确认
    //link    链接具体值
    //index   导航索引值
    selectLinkConfirm(link, index) {
      this.navIcons[index].urlTitle = link.urlTitle;
      this.navIcons[index].url = link.url;
    },
    //发布页面导航
    releaseTab() {
      this.$message({
        message: "发布成功",
        type: "success"
      });
    },
    //保存页面导航
    saveTab() {
      this.$message({
        message: "保存成功",
        type: "success"
      });
    }
  },
  components: {
    TabIconSelect,
    PageLinkSelect,
    MainScroll
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.shop-navigation-warpper {
  .gray-bg-warpper {
    display: flex;
    padding-bottom: 50px;
    padding-top: 40px;
    justify-content: center;
    .show-warpper {
      display: flex;
      flex-direction: column;
      width: 385px;
      img {
        height: 67px;
      }
      .blank-warpper {
        height: 550px;

        background-color: #fff;
      }
      .tab-list-warpper {
        background-color: #fff;
        height: 50px;
        border-top: 1px solid #e3e2e5;
        ul {
          display: flex;
          height: 100%;
          li {
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            span {
              color: $secondary-text-color;
            }
            .iconfont {
              font-size: 19px;
            }
            .title {
              font-size: 12px;
              margin-top: 3px;
            }
          }
        }
      }
    }
    .operating-warpper {
      margin-left: 130px;
      width: 450px;
      display: flex;
      flex-direction: column;
      .tab-color-warpper {
        height: 50px;
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        align-items: center;
        & > span {
          margin: 0px 20px;
          font-size: 13px;
          color: #5a5a5d;
        }
        .color-dot-warpper {
          display: flex;
          div {
            width: 12px;
            height: 12px;
            border-radius: 50%;
          }
          div:nth-of-type(2) {
            margin-left: -5px;
          }
        }
        .el-button {
          ::v-deep span {
            font-size: 13px;
          }
        }
      }
      .tab-list-warpeer {
        ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          li {
            margin-top: 15px;
            width: 215px;
            background-color: #fff;
            border-radius: 5px;
            overflow: hidden;
            &:nth-of-type(1) {
              & > div:nth-of-type(1) {
                .el-icon-close {
                  display: none;
                }
              }
            }
            & > div:nth-of-type(1) {
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 19px 0 15px;
              background: #efefef;
              text-align: left;
              span {
                font-size: 13px;
              }
              .el-icon-close {
                font-size: 16px;
                color: $secondary-text-color;
                cursor: pointer;
              }
            }

            & > div:nth-of-type(2) {
              ::v-deep .el-form {
                .el-form-item {
                  margin-bottom: 0px;
                  margin-top: 23px;
                  padding: 0px 15px;
                  text-align: left;
                  .select-icon-btn {
                    font-size: 13px;
                    color: $secondary-text-color;
                    margin-left: 3px;
                    cursor: pointer;
                    &:hover {
                      color: $theme-color;
                    }
                  }
                  .select-url-warpper {
                    & > span {
                      font-size: 13px;
                    }
                    .el-button {
                      width: 100%;
                      &:focus {
                        border-color: #dcdfe6;
                      }
                      &:hover {
                        border-color: #409eff;
                        .select-url-button {
                          span:nth-of-type(2) {
                            color: #3a8ee6;
                          }
                        }
                      }
                      .select-url-button {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                        span:nth-of-type(1) {
                          color: #6d7074;
                          font-size: 13px;
                        }
                        span:nth-of-type(2) {
                          color: $secondary-text-color;
                        }
                      }
                    }
                  }
                }
              }
            }

            & > div:nth-of-type(3) {
              margin-top: 15px;
              display: flex;
              height: 40px;
              margin-bottom: 20px;
              align-items: center;
              justify-content: center;
              & > div:nth-of-type(1) {
                margin-right: 20px;
              }
              & > div {
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #e3e2e5;
                border-radius: 4px;
                span {
                  font-size: 20px;
                }
              }
            }
          }
        }
      }
      .add-tab-button {
        background: #fff;
        margin-top: 15px;
        border: 1px dashed #e3e2e5;
        border-radius: 4px;
        font-size: 12px;
        color: #595961;
        cursor: pointer;
        width: 215px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        &.hide {
          display: none;
        }
      }
    }
  }
}
.color-popover-warpper {
  .title {
    font-size: 13px;
  }
  .color-select-warpper {
    margin-top: 15px;
    display: flex;
    & > span {
      flex-shrink: 0;
      width: 60px;
      font-size: 13px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        cursor: pointer;
        div {
          width: 100%;
          height: 100%;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          &.selecting {
            span {
              display: block;
            }
          }
          span {
            color: #fff;
            font-size: 14px;
            display: none;
          }
        }
      }
    }
  }
}
</style>
