<template>
  <div class="addpage-step-one-warpper public-warpper">
    <div class="top">
      <span @click="back">店铺页面</span>
      <span>-</span>
      <span>新建页面</span>
    </div>
    <div class="form-warpper gray-bg-warpper">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="页面标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="背景颜色">
          <el-color-picker v-model="form.color" size="small" @change="colorChange"></el-color-picker>
        </el-form-item>
        <el-form-item label="页面分享描述">
          <el-input v-model="form.share"></el-input>
        </el-form-item>
        <el-form-item label="页面分享图片">
          <div class="share-pic-warpper">
            <img :src="form.image" alt v-if="form.image" />
            <img src="../../assets/images/pic.png" alt v-else />
            <el-button plain size="medium">上传图片</el-button>
          </div>
        </el-form-item>
      </el-form>

      <div class="btn-warpper">
        <el-button type="primary" @click="next">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { publicMixins } from "mixins/public-mixins";
export default {
  mixins: [publicMixins],
  data() {
    return {
      //页面数据表单
      form: {
        color: "#fff",
        title: ""
      }
    };
  },
  methods: {
    //回退上一页
    back() {
      this.$router.go(-1);
    },
    //下一步
    next() {
      const data = this.encryption(JSON.stringify(this.form));
      this.$router.push({
        name: "shopPageStep2",
        query: {
          data
        }
      });
    },
    //改变颜色为空是默认白色
    //event  颜色改变时候返回的信息
    colorChange(event) {
      if (event === null) {
        this.form.color = "#fff";
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/theme.scss";
.addpage-step-one-warpper {
  .top {
    display: flex;
    padding: 5px;
    padding-top: 20px;
    span {
      font-size: 14px;
      margin: 0px 5px;
    }
    span:nth-of-type(1) {
      cursor: pointer;
      &:hover {
        color: $theme-color;
      }
    }
    span:nth-of-type(3) {
      font-weight: bold;
    }
  }
  .form-warpper {
    margin-top: 25px;
    padding: 20px;
    .el-form {
      background-color: #fff;
      border-radius: 5px;
      overflow: hidden;
      padding: 20px;
      box-shadow: $shadow;
      text-align: left;
      .share-pic-warpper {
        display: flex;
        align-items: center;
        img {
          margin-right: 20px;
          width: 38px;
          height: 38px;
        }
      }
    }
  }

  .btn-warpper {
    margin-top: 20px;
  }
}
</style>
