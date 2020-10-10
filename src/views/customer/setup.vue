<template>
  <div class="membership-card-setup-warpper public-warpper">
    <div class="membership-card-header">
      <ul>
        <li
          v-for="(item, index) in membershipCardList"
          :key="index"
          :class="{ active: membershipCardIndex === index }"
          @click="membershipCardChange(index)"
        >
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
    <div class="gray-bg-warpper">
      <div
        v-if="
          (membershipCardIndex === 0 &&
            Object.keys(singleLevelCard).length === 0) ||
            (membershipCardIndex === 1 &&
              Object.keys(multiLevelCard).length === 0)
        "
        class="empty-warpper"
      >
        <span
          >通过创建会员卡并设置会员优惠，帮助企业建立集品牌推广，会员管理，营销活动于一体的会员管理平台，对会员的信息进行数据分析，
          精准运营，不断提高会员复购，实现会员价值最大化。</span
        >
        <el-button type="primary" @click="createCard">创建会员卡</el-button>
        <span>会员卡创建后不可关闭</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //会员卡分类列表
      membershipCardList: ["多等级会员卡", "单等级会员卡"],
      //会员卡分类索引
      membershipCardIndex: 0,
      //多等级会员卡
      multiLevelCard: {},
      //单等级会员卡
      singleLevelCard: {}
    };
  },
  created() {
    console.log(1);
  },
  methods: {
    //当前会员卡分类改变
    //index     分类索引
    membershipCardChange(index) {
      this.membershipCardIndex = index;
    },
    //创建会员卡
    createCard() {
      if (this.membershipCardIndex === 0) {
        this.$router.push({ name: "multiLevelForm" });
      } else {
        this.$router.push({ name: "singleLevelForm" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.membership-card-setup-warpper {
  .membership-card-header {
    margin: 5px 10px 15px 10px;
    ul {
      display: flex;
      align-items: center;
      li {
        height: 36px;
        line-height: 36px;
        font-size: 16px;
        width: 120px;
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
        span {
          font-size: 14px;
        }
        &:nth-of-type(1) {
          margin-right: 10px;
        }
        &.active {
          background-color: #2589ff;
          span {
            color: #fff;
          }
        }
      }
    }
  }
  .gray-bg-warpper {
    .empty-warpper {
      height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0px 50px;
      span:nth-of-type(1) {
        font-weight: bold;
        font-size: 14px;
      }
      .el-button {
        margin: 30px 0px;
        width: 220px;
      }
      span:nth-of-type(2) {
        font-size: 13px;
      }
    }
  }
}
</style>
