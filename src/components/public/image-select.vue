<template>
  <div class="image-select-warpper">
    <el-dialog
      title="图片选择器"
      :visible.sync="dialogShow"
      :close-on-click-modal="false"
      append-to-body
      class="l-dialog"
    >
      <div class="dialog-body">
        <div>
          <div class="category-box" slot="category">
            <el-scrollbar>
              <ul>
                <li
                  v-for="(item, index) in categoryArr"
                  :key="index"
                  :class="{
                    active: index === categoryActive && !categoryInputShow
                  }"
                  @click="categoryChange(index)"
                >
                  <span v-show="!categoryInputShow || categoryActive != index">
                    {{ item }}</span
                  >
                  <el-input
                    type="text"
                    placeholder="请输入内容"
                    v-model="categoryInput"
                    maxlength="6"
                    show-word-limit
                    size="small"
                    v-show="categoryInputShow && categoryActive === index"
                  >
                  </el-input>
                </li>
              </ul>
            </el-scrollbar>
          </div>
          <div class="image-select-dialog">
            <el-scrollbar tag="ul">
              <li v-for="(item, index) in fileList" :key="index">
                <div>
                  <el-image :src="item" alt="" fit="cover" />
                </div>
              </li>
            </el-scrollbar>
          </div>
        </div>
        <el-pagination background layout="prev, pager, next" :total="20">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <div>
          <el-button type="primary" size="medium" @click="addCategoryArr"
            >新建分组</el-button
          >
          <el-button
            type="danger"
            size="medium"
            @click="deleteCategoryArr"
            :disabled="categoryArr.length <= 1"
            >删除分组</el-button
          >
          <el-button size="medium" @click="categoryInputShowChange">
            {{ categoryInputShow ? "确认命名" : "重命名分组" }}</el-button
          >
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture"
            :show-file-list="false"
            multiple
            :before-upload="addFileList"
            accept=".jpg, .jpeg, .png, .gif, .bmp, .pdf, .JPG, .JPEG, .PBG, .GIF, .BMP, .PDF"
          >
            <el-button size="medium" type="primary">点击上传</el-button>
          </el-upload>
        </div>
        <div>
          <el-button @click="hide" size="medium">取消</el-button>
          <el-button type="primary" @click="confirm" size="medium"
            >确定</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //当前分类
      categoryActive: 0,
      //分类数组
      categoryArr: ["默认分组"],
      //分组名称输入框内容
      categoryInput: "",
      //分组名称输入是否显示
      categoryInputShow: false,
      //上传图片列表
      fileList: [],
      //分类数组图片
      categoryPicArr: [
        [
          "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1309253471,1142672352&fm=26&gp=0.jpg",
          "http://img1.imgtn.bdimg.com/it/u=3212263570,894336861&fm=26&gp=0.jpg",
          "http://img1.imgtn.bdimg.com/it/u=3212263570,894336861&fm=26&gp=0.jpg",
          "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1309253471,1142672352&fm=26&gp=0.jpg",
          "http://img1.imgtn.bdimg.com/it/u=3212263570,894336861&fm=26&gp=0.jpg",
          "http://img1.imgtn.bdimg.com/it/u=3212263570,894336861&fm=26&gp=0.jpg",
          "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1309253471,1142672352&fm=26&gp=0.jpg",
          "http://img1.imgtn.bdimg.com/it/u=3212263570,894336861&fm=26&gp=0.jpg",
          "http://img1.imgtn.bdimg.com/it/u=3212263570,894336861&fm=26&gp=0.jpg"
        ]
      ],
      //弹窗显示
      dialogShow: false
    };
  },
  methods: {
    //显示弹窗
    show() {
      this.dialogShow = true;
      this.fileList = this.categoryPicArr[0];
    },
    //隐藏弹窗
    hide() {
      this.dialogShow = false;
    },
    //确认选择图片
    confirm() {},
    //分类选择
    //index  分类索引值
    categoryChange(index) {
      if (this.categoryActive != index) {
        this.categoryActive = index;
        this.categoryInputShow = false;
        this.fileList = this.categoryPicArr[index];
      }
    },
    //重命名输入框显示或隐藏
    categoryInputShowChange() {
      this.categoryInputShow = !this.categoryInputShow;
      if (this.categoryInputShow) {
        this.categoryInput = this.categoryArr[this.categoryActive];
      } else {
        this.categoryArr[this.categoryActive] = this.categoryInput;
      }
    },
    //添加新分组
    addCategoryArr() {
      const len = this.categoryArr.length;
      this.categoryArr.push(`分组${len + 1}`);
    },
    //删除分组
    deleteCategoryArr() {
      const name = this.categoryArr[this.categoryActive];
      this.$confirm(`是否删除${name}分组与该分组下的全部图片`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.categoryArr.splice(this.categoryActive, 1);
          this.categoryActive = 0;
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //上传文件之前的钩子 若返回 false 或者返回 Promise 且被 reject，则停止上传。
    //file   上传图片的文件
    addFileList() {
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";

.category-box {
  width: 180px;
  flex-shrink: 0;
  border-right: 1px solid #e3e2e5;
  height: 100%;
  ::v-deep .el-scrollbar {
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: hidden;
      ul {
        margin: 0px;
        width: 100%;
        padding-top: 20px;
        li {
          height: 35px;
          line-height: 35px;
          border-radius: 4px;
          font-size: 12px;
          margin: 0px 20px;
          margin-bottom: 20px;
          cursor: pointer;
          &.active {
            color: $theme-color;
            background-color: rgb(236, 245, 255);
          }
          span {
            padding-left: 10px;
          }
        }
      }
    }
  }
  ::v-deep .el-input__inner {
    height: 35px !important;
    font-size: 12px;
  }
}

.image-select-dialog {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  .el-scrollbar {
    flex: 1;
    ::v-deep .el-scrollbar__wrap {
      overflow-x: hidden;
      .el-scrollbar__view {
        display: flex;
        flex-wrap: wrap;
        padding: 15px;
        li {
          width: 33%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          & > div {
            width: 210px;
            height: 175px;
            border: 1px solid #e3e2e5;
            border-radius: 5px;
            cursor: pointer;
            .el-image {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}

::v-deep .el-dialog {
  width: 908px;
  height: 590px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  .el-dialog__header {
    border-bottom: 1px solid $border-color;
    padding: 8px 20px;
    height: 40px;
    flex-shrink: 0;
    .el-dialog__title {
      line-height: 40px;
      font-size: 14px;
    }
  }
  .el-dialog__body {
    padding: 0px;
    height: 473px;
    flex-shrink: 0;
    .dialog-body {
      display: flex;
      flex-direction: column;
      height: 100%;
      & > div:nth-of-type(1) {
        display: flex;
        height: calc(100% - 46px);
      }
      .el-pagination {
        height: 45px;
        flex-shrink: 0;
        background-color: #fff;
        display: flex;
        border-top: 1px solid #e3e2e5;
        align-items: center;
        justify-content: flex-end;
        padding-right: 20px;
      }
    }
  }
  .el-dialog__footer {
    flex-shrink: 0;
    padding: 0px 20px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .dialog-footer {
      width: 100%;
      display: flex;
      justify-content: space-between;
      div {
        display: flex;
        .upload-demo {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
