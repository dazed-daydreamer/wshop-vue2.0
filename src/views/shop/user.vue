<template>
  <div class="shop-user-warpper public-warpper">
    <div class="gray-bg-warpper">
      <div class="show-warpper">
        <div
          class="user-header"
          :style="{ backgroundColor: form.userHeaderBackgroundColor }"
        >
          <div class="user-info" :class="{ hasMember: form.hasMember }">
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
              <span :style="{ color: form.userHeaderMemberTextColor }"
                >获取会员专享权益</span
              >
            </div>
            <div>
              <span :style="{ color: form.userHeaderMemberTextColor }"
                >立即领卡</span
              >
            </div>
          </div>
        </div>
        <div class="user-recording">
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
      <div class="operating-warpper"></div>
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
      ]
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
        hasMember: true
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.shop-user-warpper {
  .gray-bg-warpper {
    .show-warpper {
      padding-bottom: 60px;
      width: 380px;
      border-radius: 5px;
      background-color: #f2f2f6;
      overflow: hidden;
      .user-header {
        width: 100%;
        height: 150px;
        display: flex;
        align-items: center;
        position: relative;
        .user-info {
          display: flex;
          align-items: center;
          &.hasMember {
            padding-bottom: 40px;
          }
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
          position: absolute;
          border-radius: 10px 10px 0px 0px;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
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
</style>
