<template>
  <div class="shop-user-warpper public-warpper">
    <div class="gray-bg-warpper">
      <div class="show-warpper">
        <div
          class="user-header"
          :style="{ backgroundColor: form.userHeaderBackgroundColor }"
        >
          <div class="user-info">
            <img src="../../assets/images/avatar.jpg" alt="" />
            <span :style="{ color: form.userHeadeTextrColor }">用户名称</span>
          </div>
          <div
            class="user-member"
            :style="{ backgroundColor: form.userHeaderMemberBackgroundColor }"
            v-show="form.hasMember"
          >
            <div>
              <span
                class="icon-huiyuanvip iconfont"
                :style="{ color: form.userHeaderMemberTextColor }"
              ></span>
              <span :style="{ color: form.userHeaderMemberTextColor }">{{
                form.userHeaderText
              }}</span>
            </div>
            <div>
              <span :style="{ color: form.userHeaderMemberTextColor }"
                >立即领卡</span
              >
            </div>
          </div>
        </div>
        <div class="user-recording" v-show="form.hasRecording">
          <ul>
            <li v-for="(item, index) in userRecordings" :key="index">
              <span :class="item.icon" class="iconfont"></span>
              <span>{{ item.title }}</span>
            </li>
          </ul>
        </div>
        <div class="user-order">
          <div class="order-header">
            <span>我的订单</span>
            <div>
              <span>查看全部</span>
              <span class="el-icon-arrow-right"></span>
            </div>
          </div>
          <div class="order-list">
            <ul>
              <li v-for="(item, index) in userOrders" :key="index">
                <span class="iconfont" :class="item.icon"></span>
                <span>{{ item.title }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="user-other">
          <ul>
            <li v-for="(item, index) in userOthers" :key="index">
              <div>
                <span class="iconfont" :class="item.icon"></span>
                <span>{{ item.title }}</span>
              </div>
              <span class="el-icon-arrow-right"></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="operating-warpper">
        <el-collapse
          accordion
          v-model="collapseActive"
          @change="collapseChange"
        >
          <el-collapse-item name="1">
            <template slot="title">
              <el-checkbox v-model="form.hasHeader" disabled></el-checkbox>
              <span class="title">用户头部</span>
            </template>
            <div class="header">
              <div>
                <div class="title">
                  <span>头部背景</span>
                </div>
                <div>
                  <el-color-picker
                    v-model="form.userHeaderBackgroundColor"
                    @change="colorSelect($event, 'userHeaderBackgroundColor')"
                  ></el-color-picker>
                  <span>{{ form.userHeaderBackgroundColor }}</span>
                </div>
              </div>
              <div>
                <div class="title">
                  <span>头部文字</span>
                </div>
                <div>
                  <el-color-picker
                    v-model="form.userHeadeTextrColor"
                    @change="colorSelect($event, 'userHeadeTextrColor')"
                  ></el-color-picker>
                  <span>{{ form.userHeadeTextrColor }}</span>
                </div>
              </div>
              <div>
                <div class="title">
                  <span>会员卡文案</span>
                </div>
                <div>
                  <el-input
                    type="text"
                    placeholder="请输入内容"
                    v-model="form.userHeaderText"
                    size="small"
                    maxlength="10"
                    show-word-limit
                  >
                  </el-input>
                </div>
              </div>
              <div>
                <div class="title">
                  <span>会员卡背景</span>
                </div>
                <div>
                  <el-color-picker
                    v-model="form.userHeaderMemberBackgroundColor"
                    @change="
                      colorSelect($event, 'userHeaderMemberBackgroundColor')
                    "
                  ></el-color-picker>
                  <span>{{ form.userHeaderMemberBackgroundColor }}</span>
                </div>
              </div>
              <div>
                <div class="title">
                  <span>会员卡文字</span>
                </div>
                <div>
                  <el-color-picker
                    v-model="form.userHeaderMemberTextColor"
                    @change="colorSelect($event, 'userHeaderMemberTextColor')"
                  ></el-color-picker>
                  <span>{{ form.userHeaderMemberTextColor }}</span>
                </div>
              </div>
              <div>
                <div class="title">
                  <span>会员卡显示</span>
                </div>
                <div>
                  <el-checkbox v-model="form.hasMember"></el-checkbox>
                  <span>是否显示会员卡</span>
                </div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template slot="title">
              <el-checkbox v-model="form.hasRecording"></el-checkbox>
              <span class="title">用户记录</span>
            </template>
            <div class="recording">
              <span>固定样式暂不支持配置</span>
            </div>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template slot="title">
              <el-checkbox v-model="form.hasOrder" disabled></el-checkbox>
              <span class="title">订单信息</span>
            </template>
            <div class="order">
              <span>固定样式暂不支持配置</span>
            </div>
          </el-collapse-item>
          <el-collapse-item name="4">
            <template slot="title">
              <el-checkbox v-model="form.hasPicNavOne"></el-checkbox>
              <span class="title">图片导航1</span>
            </template>
            <div></div>
          </el-collapse-item>
          <el-collapse-item name="5">
            <template slot="title">
              <el-checkbox v-model="form.hasDistribution"></el-checkbox>
              <span class="title">分销中心</span>
            </template>
            <div></div>
          </el-collapse-item>
          <el-collapse-item name="6">
            <template slot="title">
              <el-checkbox v-model="form.hasMenu" disabled></el-checkbox>
              <span class="title">菜单</span>
            </template>
            <div></div>
          </el-collapse-item>
          <el-collapse-item name="7">
            <template slot="title">
              <el-checkbox v-model="form.hasPicNavTwo"></el-checkbox>
              <span class="title">图片导航2</span>
            </template>
            <div></div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="footer-btn">
      <div>
        <el-button type="primary" size="medium" @click="releaseTab"
          >发布</el-button
        >
        <el-button plain size="medium" @click="saveTab">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //用户中心表单
      form: {},
      //用户记录列表
      userRecordings: [
        {
          icon: "icon-xin",
          title: "收藏"
        },
        {
          icon: "icon-zuji",
          title: "足迹"
        },
        {
          icon: "icon-liwu1",
          title: "优惠"
        }
      ],
      //用户订单列表
      userOrders: [
        {
          icon: "icon-31daifukuan",
          title: "待付款"
        },
        {
          icon: "icon-31daifahuo",
          title: "待发货"
        },
        {
          icon: "icon-31daishouhuo",
          title: "待收货"
        },
        {
          icon: "icon-tuikuantuihuo",
          title: "退款/售后"
        }
      ],
      //用户其他列表
      userOthers: [
        {
          icon: "icon-fenxiao",
          title: "分销中心"
        },
        {
          icon: "icon-pintuan2",
          title: "拼团"
        },
        {
          icon: "icon-youhuiquan3",
          title: "优惠中心"
        },
        {
          icon: "icon-shouhuodizhi",
          title: "收货地址"
        },
        {
          icon: "icon-kefu1",
          title: "客服"
        },
        {
          icon: "icon-chilun",
          title: "设置"
        }
      ],
      //当前折叠板标志符
      collapseActive: "1"
    };
  },
  created() {
    this._getUserInfo();
  },
  methods: {
    //获取用户页面信息
    _getUserInfo() {
      this.form = {
        userHeaderBackgroundColor: "#CCCCCC",
        userHeadeTextrColor: "#FFFFFF",
        userHeaderMemberBackgroundColor: "#828282",
        userHeaderMemberTextColor: "#FFFFFF",
        userHeaderText: "获取会员专享权益",
        hasMember: true,
        hasHeader: true,
        hasRecording: true,
        hasOrder: true,
        hasPicNavOne: false,
        hasPicNavTwo: false,
        hasMenu: true,
        hasDistribution: false
      };
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
    },
    //折叠面板改变
    //id  改变item的标志符
    collapseChange(id) {
      if (id != "") {
        this.collapseActive = id;
      }
    },
    //颜色改变
    //color  当前颜色值
    //key    改变的变量
    colorSelect(color, key) {
      if (color == null) {
        this.form[key] = "#FFFFFF";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.shop-user-warpper {
  .gray-bg-warpper {
    display: flex;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 60px;
    .show-warpper {
      width: 380px;
      border-radius: 5px;
      background-color: #f2f2f6;
      overflow: hidden;
      .user-header {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        .user-info {
          width: 100%;
          height: 110px;
          display: flex;
          align-items: center;
          img {
            margin-left: 40px;
            width: 45px;
            height: 45px;
            border-radius: 50%;
          }
          & > span {
            margin-left: 15px;
            font-size: 16px;
          }
        }
        .user-member {
          height: 40px;
          width: calc(100% - 30px);
          border-radius: 10px 10px 0px 0px;
          left: 50%;
          box-shadow: $shadow;
          display: flex;
          align-items: center;
          justify-content: space-between;
          span {
            font-size: 14px;
          }
          & > div:nth-of-type(1) {
            margin-left: 15px;
            span:nth-of-type(1) {
              margin-right: 5px;
            }
          }
          & > div:nth-of-type(2) {
            margin-right: 15px;
          }
        }
      }
      .user-recording {
        background-color: #fff;
        padding: 10px 0px;
        ul {
          display: flex;
          li {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 50px;
            &:not(:nth-of-type(1)) {
              border-left: 1px solid #eee;
            }
            span:nth-of-type(1) {
              margin-bottom: 3px;
              font-size: 20px;
            }
            span:nth-of-type(2) {
              font-size: 13px;
            }
          }
        }
      }
      .user-order {
        margin-top: 10px;
        border-radius: 5px;
        overflow: hidden;
        .order-header {
          background-color: #fff;
          height: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0px 15px;
          span {
            font-size: 13px;
          }
          div {
            display: flex;
            align-items: center;
            span:nth-of-type(1) {
              margin-right: 3px;
            }
            span {
              color: $secondary-text-color;
            }
          }
        }
        .order-list {
          border-top: 1px solid #eee;
          background-color: #fff;
          ul {
            display: flex;
            li {
              flex: 1;
              display: flex;
              flex-direction: column;
              height: 70px;
              align-items: center;
              justify-content: center;
              span:nth-of-type(1) {
                margin-bottom: 3px;
                font-size: 23px;
              }
              span:nth-of-type(2) {
                font-size: 13px;
              }
            }
          }
        }
      }
      .user-other {
        margin-top: 10px;
        background-color: #fff;
        border-radius: 5px;
        overflow: hidden;
        ul {
          display: flex;
          flex-direction: column;
          li {
            display: flex;
            align-items: center;
            padding: 0px 15px;
            justify-content: space-between;
            height: 40px;
            &:not(:nth-last-of-type(1)) {
              border-bottom: 1px solid #eee;
            }
            & > div {
              display: flex;
              align-items: center;
              span:nth-of-type(1) {
                margin-right: 10px;
                font-size: 20px;
              }
              span:nth-of-type(2) {
                font-size: 13px;
              }
            }
            & > span {
              font-size: 13px;
            }
          }
        }
      }
    }
    .operating-warpper {
      margin-left: 130px;
      width: 460px;
      padding: 10px;
      background-color: #fff;
      ::v-deep .el-collapse {
        border: 1px solid #ebeef5;
        .el-collapse-item__header {
          background-color: #f2f2f6;
          border: none;
          i {
            display: none;
          }
          .el-checkbox {
            margin-left: 15px;
            margin-right: 10px;
          }
        }
        .el-collapse-item__content {
          padding: 0px;
          .recording,
          .order {
            padding: 20px 0px;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
              font-size: 13px;
            }
          }

          .header {
            padding: 20px 20px;
            & > div {
              display: flex;
              align-items: center;
              &:not(:nth-of-type(1)) {
                margin-top: 14px;
              }
              & > .title {
                width: 100px;
                text-align: left;
              }
              & > div:nth-of-type(2) {
                display: flex;
                align-items: center;
                & > span {
                  font-size: 12px;
                  margin-left: 15px;
                }
                .el-color-picker {
                  height: 30px;
                  .el-color-picker__trigger {
                    height: 30px;
                    width: 56px;
                  }
                }

                .el-input {
                  width: 200px;
                }
              }
            }
          }
        }
      }
    }
    .footer-btn {
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: 60px;
      text-align: center;
      line-height: 60px;
      z-index: 999;
      & > div {
        border-radius: 10px 10px 0px 0px;
        box-shadow: $shadow;
        overflow: hidden;
        background-color: #fff;
        margin: 0px 10px;
        height: 100%;
      }
    }
  }
}
</style>
