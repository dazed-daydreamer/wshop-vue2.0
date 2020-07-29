<template>
  <main-scroll>
    <div class="shop-list-warpper public-warpper">
      <div class="gray-bg-warpper">
        <div class="show-warpper">
          <img
            src="../../assets/images/listTpl.png"
            v-if="listStatus == 0"
            alt=""
          />
          <img src="../../assets/images/listTpl_2.png" v-else alt="" />
        </div>
        <div class="operating-warpper">
          <div>
            <div class="title">显示设置</div>
            <div class="show">
              <div>
                <el-checkbox v-model="listStatus">大图显示</el-checkbox>
              </div>
              <div>
                <el-checkbox v-model="listSales">商品销量</el-checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-btn" slot="footer">
      <div>
        <el-button size="medium" @click="saveList" type="primary"
          >保存</el-button
        >
      </div>
    </div>
  </main-scroll>
</template>

<script>
import MainScroll from "components/public/main-scroll.vue";
import { getPagelistStencil } from "@/api/http.js";
export default {
  data() {
    return {
      //大图显示状态
      listStatus: false,
      //商品销量显示状态
      listSales: false
    };
  },
  created() {
    this._getPagelistStencil();
  },
  methods: {
    //获取列表模版数据
    async _getPagelistStencil() {
      const res = await getPagelistStencil();
      this.listStatus = res.data.status == "0" ? false : true;
      this.listSales = res.data.sales == "0" ? false : true;
    },
    //保存列表模版
    saveList() {
      this.$message({
        message: "保存成功",
        type: "success"
      });
    }
  },
  components: {
    MainScroll
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.shop-list-warpper {
  .gray-bg-warpper {
    display: flex;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 60px;
    .show-warpper {
      img {
        width: 355px;
        height: 625px;
      }
    }
    .operating-warpper {
      margin-left: 130px;
      width: 400px;
      & > div {
        display: flex;
        .title {
          font-size: 13px;
          width: 100px;
          flex-shrink: 0;
        }
        .show {
          display: flex;
          & > div:nth-of-type(1) {
            margin-right: 25px;
          }
          ::v-deep .el-checkbox__label {
            font-size: 13px;
            color: $routine-text-color;
          }
        }
      }
    }
  }
}
</style>
