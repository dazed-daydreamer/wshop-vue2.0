<template>
  <div class="shop-theme-warpper public-warpper">
    <div class="gray-bg-warpper">
      <div class="operating-warpper">
        <ul>
          <li
            v-for="(item, index) in themeColors"
            :key="index"
            @click="changThemeActive(index)"
          >
            <div>
              <span>{{ getThemeTitle(index) }}</span>
              <span v-if="index === themeActive">(使用中)</span>
            </div>
            <div v-if="index === 5">
              <el-color-picker v-model="item.main"></el-color-picker>
              <el-color-picker v-model="item.secondary"></el-color-picker>
            </div>
            <div v-else>
              <div :style="{ backgroundColor: item.main }"></div>
              <div :style="{ backgroundColor: item.secondary }"></div>
            </div>
          </li>
        </ul>
      </div>
      <div class="show-warpper">
        <div>
          <img src="../../assets/images/theme_1.png" alt="" />
          <div class="price" :style="{ color: activeMainColor }">
            <span> ¥</span>
            <span>800.00</span>
          </div>
          <div
            class="goods-color"
            :style="{ color: activeMainColor, borderColor: activeMainColor }"
          >
            <span>黄</span>
          </div>

          <div
            class="goods-size"
            :style="{ color: activeMainColor, borderColor: activeMainColor }"
          >
            <span>M</span>
          </div>

          <div class="btn">
            <div :style="{ backgroundColor: activeSecondaryColor }">
              <span>加入购物车</span>
            </div>
            <div :style="{ backgroundColor: activeMainColor }">
              <span>立即购买</span>
            </div>
          </div>
        </div>
        <div>
          <img src="../../assets/images/theme_2.png" alt="" />
          <div class="delete" :style="{ backgroundColor: activeMainColor }">
            <span>删除</span>
          </div>
          <div class="price" :style="{ color: activeMainColor }">
            <span> ¥</span>
            <span>800.00</span>
          </div>
          <div class="btn" :style="{ backgroundColor: activeMainColor }">
            <span>去结算</span>
          </div>
        </div>
        <div>
          <img src="../../assets/images/theme_3.png" alt="" />
          <div class="goods-price" :style="{ color: activeMainColor }">
            <span> ¥</span>
            <span>184.00</span>
          </div>

          <div class="price" :style="{ color: activeMainColor }">
            <span> ¥</span>
            <span>170.00</span>
          </div>

          <div class="btn" :style="{ backgroundColor: activeMainColor }">
            <span>提交订单</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-btn">
      <div>
        <el-button size="medium" @click="saveTheme" type="primary"
          >保存</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //主题颜色组
      themeColors: [
        {
          main: "#FA6868",
          secondary: "#FFB56C"
        },
        {
          main: "#F56FA6",
          secondary: "#454552"
        },
        {
          main: "#E85A71",
          secondary: "#454552"
        },
        {
          main: "#86B902",
          secondary: "#454552"
        },
        {
          main: "#40BAFF",
          secondary: "#454552"
        },
        {
          main: "",
          secondary: ""
        }
      ],
      //当前主题索引值
      themeActive: 0
    };
  },
  methods: {
    //保存色系
    saveTheme() {
      this.$message({
        message: "保存成功",
        type: "success"
      });
    },
    //返回风格名称
    // index   当前风格的索引值
    getThemeTitle(index) {
      let title = "";
      switch (index) {
        case 0:
          title = "风格一";
          break;
        case 1:
          title = "风格二";
          break;
        case 2:
          title = "风格三";
          break;
        case 3:
          title = "风格四";
          break;
        case 4:
          title = "风格五";
          break;
        case 5:
          title = "自定义风格";
          break;
        default:
          return title;
      }
      return title;
    },
    //改变当前主题
    //index  主题的索引值
    changThemeActive(index) {
      this.themeActive = index;
    }
  },
  computed: {
    activeMainColor() {
      return this.themeColors[this.themeActive].main;
    },
    activeSecondaryColor() {
      return this.themeColors[this.themeActive].secondary;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.shop-theme-warpper {
  .gray-bg-warpper {
    display: flex;
    .operating-warpper {
      ul {
        background-color: #fff;
        width: 220px;
        background: #fff;
        border: 1px solid #e3e2e5;
        border-radius: 6px;
        padding: 5px 5px 0px 5px;
        li {
          height: 50px;
          margin-bottom: 5px;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 0 5px;
          font-size: 14px;
          color: #595961;
          line-height: 24px;
          font-weight: 600;
          &:hover {
            background: #f2f2f6;
          }
          & > div {
            display: flex;
            &:nth-of-type(1) {
              span:nth-of-type(2) {
                margin-left: 5px;
                font-size: 13px;
              }
            }
            &:nth-of-type(2) {
              div {
                margin-left: 10px;
                width: 30px;
                height: 30px;
                border-radius: 4px;
                overflow: hidden;
                border: 1px solid #e1e0e6;
              }
              ::v-deep .el-color-picker {
                .el-color-picker__trigger {
                  padding: 0;
                  width: 30px;
                  height: 30px;
                  border: none;
                  .el-color-picker__color {
                    border: none;
                  }
                  .el-color-picker__icon {
                    display: none;
                  }
                }
              }
            }
          }
        }
      }
    }
    .show-warpper {
      display: flex;
      & > div {
        position: relative;
        margin-left: 20px;
        img {
          width: 252px;
        }
        &:nth-of-type(1) {
          .price {
            position: absolute;
            top: 145px;
            left: 90px;
            display: flex;
            align-items: baseline;
            span:nth-of-type(1) {
              font-size: 12px;
            }
            span:nth-of-type(2) {
              font-size: 13px;
            }
          }
          .goods-color,
          .goods-size {
            transform: scale(0.8);
            width: 21px;
            height: 21px;
            border-width: 1px;
            position: absolute;
            border-style: solid;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
              font-size: 12px;
            }
          }
          .goods-color {
            top: 248px;
            left: 67px;
          }

          .goods-size {
            top: 313px;
            left: 67px;
            transform: scale(0.85);
          }

          .btn {
            position: absolute;
            display: flex;
            bottom: 39px;
            left: 0px;
            height: 30px;
            width: 100%;
            display: flex;
            div {
              flex: 1;
              line-height: 30px;
              span {
                font-size: 12px;
                color: #fff;
              }
            }
          }
        }
        &:nth-of-type(2) {
          .delete {
            position: absolute;
            right: 1px;
            top: 76px;
            width: 40px;
            height: 70px;
            line-height: 70px;
            span {
              font-size: 12px;
              color: #fff;
            }
          }
          .price {
            position: absolute;
            bottom: 83px;
            left: 120px;
            transform: scale(0.8);
            display: flex;
            align-items: baseline;
            span:nth-of-type(1) {
              font-size: 12px;
            }
            span:nth-of-type(2) {
              font-size: 13px;
            }
          }

          .btn {
            width: 80px;
            height: 33px;
            bottom: 70px;
            right: 1px;
            line-height: 33px;
            position: absolute;
            span {
              font-size: 12px;
              color: #fff;
            }
          }
        }
        &:nth-of-type(3) {
          .goods-price {
            position: absolute;
            top: 271.5px;
            right: 10px;
            transform: scale(0.75);
            display: flex;
            align-items: baseline;
            span:nth-of-type(1) {
              font-size: 12px;
            }
            span:nth-of-type(2) {
              font-size: 13px;
            }
          }
          .price {
            position: absolute;
            bottom: 46px;
            left: 35px;
            transform: scale(0.85);
            display: flex;
            align-items: baseline;
            span:nth-of-type(1) {
              font-size: 12px;
            }
            span:nth-of-type(2) {
              font-size: 13px;
            }
          }
          .btn {
            position: absolute;
            right: 1px;
            bottom: 38px;
            width: 80px;
            height: 33px;
            line-height: 33px;
            span {
              color: #fff;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
