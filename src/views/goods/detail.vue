<template>
  <main-scroll>
    <div class="product-detail-warpper public-warpper">
      <div class="step-header">
        <ul>
          <li
            v-for="(item, index) in stepList"
            :key="index"
            :class="{ active: index === 2 }"
          >
            <div>{{ index + 1 }}</div>
            <span>{{ item }}</span>
            <div class="line"></div>
          </li>
        </ul>
      </div>
      <div class="gray-bg-warpper">
        <div class="editor-warpper">
          <div class="title">
            编辑详情
          </div>
          <div class="editor">
            <l-ueditor
              :ueditorHeight="580"
              @editorChange="editorChange"
            ></l-ueditor>
          </div>
        </div>
        <div class="preview-warpper">
          <div class="title">
            商品详情预览
          </div>
          <div class="preview">
            <img src="../../assets/images/detailHeader.png" alt="" />
            <el-scrollbar>
              <div v-html="form.content"></div>
            </el-scrollbar>
            <img src="../../assets/images/detailBottom.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="footer-btn" slot="footer">
      <div>
        <el-button size="medium" @click="cancel" plain>取消</el-button>
        <el-button size="medium" @click="back" plain>上一步</el-button>
        <el-button size="medium" @click="save" type="primary">保存</el-button>
      </div>
    </div>
  </main-scroll>
</template>

<script>
import MainScroll from "components/public/main-scroll.vue";
import LUeditor from "components/public/l-ueditor.vue";
export default {
  data() {
    return {
      //步骤列表
      stepList: ["基本信息", "扩展信息", "图文详情"],
      //上一页的表单
      prevForm: {},
      //文本内容
      form: {}
    };
  },
  created() {
    this.prevForm = this.$route.query;
  },
  methods: {
    //取消该操作
    cancel() {},
    //回退上一步
    back() {
      this.$router.go(-1);
    },
    //保存表单
    save() {
      const form = Object.assign(this.prevForm, this.form);
      console.log(form);
    },
    //富文本内容改变
    //content   富文本内容
    editorChange(content) {
      this.$set(this.form, "content", content);
    }
  },
  components: {
    MainScroll,
    LUeditor
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.product-detail-warpper {
  .step-header {
    margin: 20px 0px;
    ul {
      display: flex;
      align-items: center;
      justify-content: center;
      li {
        display: flex;
        align-items: center;
        & > div:nth-of-type(1) {
          width: 30px;
          height: 30px;
          line-height: 30px;
          border: 1px solid #76767b;
          border-radius: 50%;
        }
        span {
          font-size: 13px;
          font-weight: bold;
          margin-left: 15px;
        }
        &:nth-last-of-type(1) {
          .line {
            display: none;
          }
        }
        .line {
          width: 90px;
          height: 1px;
          margin: 0px 10px;
          background-color: #e3e2e5;
        }
        &.active {
          & > div:nth-of-type(1) {
            background-color: #2689ff;
            border-color: #2689ff;
            color: #fff;
          }
        }
      }
    }
  }
  .gray-bg-warpper {
    padding-bottom: 50px;
    display: flex;
    justify-content: space-around;
    padding-top: 40px;
    & > .editor-warpper,
    & > .preview-warpper {
      width: 550px;
      background-color: #fff;
      border-radius: 5px;
      & > .title {
        height: 50px;
        font-size: 14px;
        line-height: 50px;
        text-align: left;
        padding: 0px 20px;
        border-bottom: 1px solid #f2f2f2;
        font-weight: bold;
      }
    }
    & > .editor-warpper {
      & > .editor {
        padding: 20px;
        width: 450px;
        margin: 0px auto;
      }
    }
    & > .preview-warpper {
      .preview {
        width: 450px;
        margin: 20px auto;
        border: 1px solid #dadada;
        border-radius: 4px;
        padding-top: 20px;
        img {
          max-width: 100%;
        }
        & > img {
          width: 100%;
        }
        .el-scrollbar {
          height: 500px;
          .el-scrollbar__wrap {
            overflow-x: hidden;
            div {
              text-align: left;
            }
          }
        }
      }
    }
  }
}
</style>
