<template>
  <div class="overview-warpper">
    <div class="statistics-warpper">
      <div class="handle">
        <ul class="cu-list">
          <li v-for="(item, index) in handleArr" :key="index" class="cu-item">
            <span>{{ item.count }}</span>
            <span>{{ item.title }}</span>
          </li>
        </ul>
      </div>
      <div class="bindings">
        <div class="no-bindings">
          <span>店铺还没有绑定小程序或公众号</span>
          <el-button type="primary" size="small" round>去绑定</el-button>
        </div>
      </div>
    </div>
    <div class="function-warpper">
      <div class="title">常用功能</div>
      <div class="cu-warpper">
        <ul class="cu-list">
          <li v-for="(item, index) in functionNav" :key="index" class="cu-item">
            <div class="icon-warpper">
              <span :class="item.icon" class="iconfont"></span>
            </div>
            <div class="nav-title">{{ item.title }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="marketing-warpper">
      <div class="title">营销活动</div>
      <div class="cu-warpper">
        <ul class="cu-list">
          <li
            v-for="(item, index) in marketingNav"
            :key="index"
            class="cu-item"
          >
            <div class="icon-warpper">
              <span :class="item.icon" class="iconfont"></span>
            </div>
            <div class="nav-title">
              <span>{{ item.title }}</span>
              <span>{{ item.introduce }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //操作列表
      handleArr: [
        {
          title: "待付订单",
          count: 0
        },
        {
          title: "待发货订单",
          count: 0
        },
        {
          title: "待处理维权",
          count: 0
        },
        {
          title: "已售罄商品",
          count: 0
        }
      ],
      //常用功能列表
      functionNav: [
        {
          title: "发布商品",
          icon: "icon-fabushangpin"
        },
        {
          title: "店铺模板",
          icon: "icon-dianpumoban"
        },
        {
          title: "消息通知",
          icon: "icon-xiaoxitongzhi"
        },
        {
          title: "营收概况",
          icon: "icon-caiwu"
        },
        {
          title: "客户管理",
          icon: "icon-kehuguanli"
        },
        {
          title: "交易分析",
          icon: "icon-fenxi"
        }
      ],
      //营销活动列表
      marketingNav: [
        {
          title: "拼团",
          icon: "icon-pintuan",
          introduce: "拼单成团，裂变获客、促转化"
        },
        {
          title: "砍价",
          icon: "icon-kanjia",
          introduce: "邀请朋友帮砍，裂变传播提销量"
        },
        {
          title: "限时折扣",
          icon: "icon-naozhongshijianjishitixingxianshitongzhimianxing",
          introduce: "商品限时打折促销"
        },
        {
          title: "满减满折",
          icon: "icon-dazheyouhui",
          introduce: "满元/件优惠，提升客单价"
        },
        {
          title: "满包邮",
          icon: "icon-kuaidi",
          introduce: "购买一定金额/件数即包邮，零流失"
        },
        {
          title: "优惠券",
          icon: "icon-youhuiquan",
          introduce: "券动客心，营销必备"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.overview-warpper {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  .statistics-warpper {
    padding: 0px 10px;
    display: flex;
    margin-top: 5px;
    .handle {
      margin-right: 10px;
      flex: 1;
      background-color: #ffffff;
      box-shadow: $shadow;
      border-radius: 5px;
      height: 190px;
      .cu-list {
        display: flex;
        align-items: center;
        height: 100%;
        margin: 0;
        .cu-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          span:nth-of-type(1) {
            margin-bottom: 10px;
            color: $theme-color;
            font-weight: bold;
            font-size: 28px;
          }
          span:nth-of-type(2) {
            font-size: 15px;
            font-weight: bold;
          }
        }
      }
    }
    .bindings {
      width: 500px;
      background-color: #ffffff;
      height: 190px;
      border-radius: 5px;
      box-shadow: $shadow;
      .no-bindings {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        span {
          font-size: 14px;
        }
        button {
          margin-top: 15px;
          background-color: $theme-color;
        }
      }
    }
  }
  .function-warpper {
    height: 180px;
    margin: 15px 10px;
    background-color: #ffffff;
    box-shadow: $shadow;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0px 30px;
    .title {
      margin-top: 20px;
      font-size: 15px;
      font-weight: bold;
    }
    .cu-list {
      margin-top: 30px;
      display: flex;
      .cu-item {
        margin-right: 8vw;
        .icon-warpper {
          width: 65px;
          height: 65px;
          line-height: 65px;
          text-align: center;
          background-color: $theme-color;
          border-radius: 5px;
          span {
            color: #ffffff;
            font-size: 25px;
          }
        }
        .nav-title {
          margin-top: 10px;
          font-size: 14px;
        }
      }
    }
  }

  .marketing-warpper {
    height: 380px;
    margin: 15px 10px;
    background-color: #ffffff;
    box-shadow: $shadow;
    padding: 0px 30px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .title {
      margin-top: 20px;
      font-size: 15px;
      font-weight: bold;
    }
    .cu-warpper {
      width: 100%;
      .cu-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        cursor: pointer;
        .cu-item {
          margin: 25px 0px;
          width: 27%;
          border: 1px solid #dcdfe6;
          height: 100px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          .icon-warpper {
            width: 65px;
            height: 65px;
            flex-shrink: 0;
            margin: 0px 15px;
            border-radius: 5px;
            line-height: 65px;
            text-align: center;
            background-color: #fc7d99;
            span {
              color: #ffffff;
              font-size: 25px;
            }
          }
          .nav-title {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            flex: 1;
            width: 0;
            span {
              font-size: 15px;
              text-align: left;
            }
            span:nth-of-type(2) {
              width: 100%;
              font-size: 13px;
              margin-top: 15px;
              color: $secondary-text-color;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}
</style>
