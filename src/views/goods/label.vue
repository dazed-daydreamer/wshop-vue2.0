<template>
  <main-scroll>
    <div class="product-label-warpper public-warpper">
      <div class="gray-bg-warpper"></div>
    </div>
    <div class="footer-btn" slot="footer">
      <div>
        <span>已选0条,共2条,当前为第1页</span>
        <el-pagination
          background
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
        >
        </el-pagination>
      </div>
    </div>
  </main-scroll>
</template>

<script>
import MainScroll from "components/public/main-scroll.vue";
export default {
  components: {
    MainScroll
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.footer-btn {
  & > div {
    display: flex;
    padding: 0px 10px;
    justify-content: space-between;
    align-items: center;
    & > span {
      font-size: 13px;
      color: $secondary-text-color;
    }
    ::v-deep {
      .el-pagination {
        display: flex;
        align-items: center;
        ul {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
