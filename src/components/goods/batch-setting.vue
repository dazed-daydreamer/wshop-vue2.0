<template>
  <div class="batch-setting-warpper">
    <span>批量设置</span>
    <div>
      <div>
        <el-input
          v-model="coding"
          placeholder="商家编码"
          size="small"
        ></el-input>
        <el-input
          v-model="sellingPrice"
          placeholder="销售价"
          size="small"
        ></el-input>
        <el-input
          v-model="marketPrice"
          placeholder="市场价"
          size="small"
        ></el-input>
        <el-input
          v-model="costPrice"
          placeholder="成本价"
          size="small"
        ></el-input>
      </div>
      <div>
        <el-input v-model="stock" placeholder="库存" size="small"></el-input>
        <el-input v-model="weight" placeholder="重量" size="small"></el-input>
        <el-input v-model="volume" placeholder="体积" size="small"></el-input>
      </div>
    </div>
    <el-button type="primary" size="small" @click="confirm">确定</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //商家编码
      coding: "",
      //销售价
      sellingPrice: "",
      //市场价
      marketPrice: "",
      //成本价
      costPrice: "",
      //库存
      stock: "",
      //重量
      weight: "",
      //体积
      volume: ""
    };
  },
  methods: {
    confirm() {
      this.$emit("batchSettingConfirm", {
        coding: this.coding,
        sellingPrice: this.sellingPrice,
        marketPrice: this.marketPrice,
        costPrice: this.costPrice,
        stock: this.stock,
        weight: this.weight,
        volume: this.volume
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.batch-setting-warpper {
  display: flex;
  span {
    font-size: 12px;
  }
  & > span {
    line-height: 32px;
    margin-right: 20px;
  }
  & > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    & > div {
      display: flex;
      &:nth-of-type(2) {
        margin-top: 20px;
      }
      .el-input {
        width: 130px;
        margin-right: 15px;
      }
    }
  }

  .el-button {
    height: 32px;
  }
}
</style>
