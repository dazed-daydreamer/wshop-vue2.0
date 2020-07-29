<template>
  <main-scroll>
    <div class="shop-search-warpper public-warpper">
      <div class="gray-bg-warpper">
        <div class="header">
          <span>搜素热词</span>
          <el-button plain size="small" @click="show(-1)">添加热词</el-button>
          <span>热词数量上限为10个，可拖动排序</span>
        </div>
        <div class="search-list">
          <div class="list-header">
            <div>关键词</div>
            <div>类型</div>
            <div>操作</div>
          </div>
          <draggable class="list-group" element="ul" v-model="keyList">
            <transition-group type="transition" :name="'flip-list'">
              <li
                class="list-group-item"
                v-for="(item, index) in keyList"
                :key="item.keyWork"
              >
                <div>{{ item.keyWork }}</div>
                <div>
                  {{ item.type === "0" ? "关键词搜索商品" : "链接页面" }}
                </div>
                <div>
                  <el-button type="text" size="small" @click="show(index)"
                    >编辑</el-button
                  >
                  <el-popconfirm
                    :title="`是否删除热词: ${item.keyWork}?`"
                    @onConfirm="deleteHotKey(index)"
                  >
                    <el-button type="text" size="small" slot="reference"
                      >删除</el-button
                    >
                  </el-popconfirm>
                </div>
              </li>
            </transition-group>
          </draggable>
        </div>
      </div>

      <el-dialog
        :visible.sync="dialogVisible"
        width="400px"
        :before-close="hide"
        class="add-hot-dialog"
        append-to-body
      >
        <div slot="title">
          <span>添加热词</span>
        </div>
        <div>
          <el-form
            :model="addHotForm"
            label-width="100px"
            :rules="rules"
            ref="keyForm"
          >
            <el-form-item label="关键词" prop="keyWork">
              <el-input
                v-model="addHotForm.keyWork"
                size="small"
                maxlength="10"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="热词类型">
              <el-radio-group v-model="addHotForm.type">
                <el-radio label="0">
                  <span>关键词搜索商品</span>
                </el-radio>
                <el-radio label="1">
                  <span>链接页面</span>
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-show="addHotForm.type === '1'">
              <el-button plain size="small" @click="selectLinkShow"
                >选择链接</el-button
              >
              <span>{{ addHotForm.linkTitle }}</span>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="hide">取 消</el-button>
          <el-button type="primary" @click="saveHotkey">确 定</el-button>
        </span>
      </el-dialog>
      <page-link-select
        ref="pageLinkSelect"
        @confirm="selectLinkConfirm"
      ></page-link-select>
    </div>

    <div class="footer-btn" slot="footer">
      <div>
        <el-button size="medium" @click="saveSearch" type="primary"
          >保存</el-button
        >
      </div>
    </div>
  </main-scroll>
</template>

<script>
import PageLinkSelect from "@/components/public/page-link-select.vue";
import Draggable from "vuedraggable";
import MainScroll from "components/public/main-scroll.vue";
export default {
  data() {
    return {
      //新增热词弹窗是否显示
      dialogVisible: false,
      //新增热词表单
      addHotForm: {
        type: "0",
        key: "",
        link: "",
        linkTitle: ""
      },
      //关键词数组
      keyList: [],
      //当前的热词表单的索引值
      activeKeyFormIndex: -1,
      //热词表单严重
      rules: {
        keyWork: [
          { required: true, message: "关键词不能为空", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    //保存搜索页
    saveSearch() {
      this.$message({
        message: "保存成功",
        type: "success"
      });
    },
    //弹窗关闭触发
    hide() {
      this.addHotForm = {
        type: "0",
        keyWork: "",
        link: "",
        linkTitle: ""
      };
      this.activeKeyFormIndex = -1;
      this.$nextTick(() => {
        this.$refs.keyForm.resetFields();
        this.dialogVisible = false;
      });
    },
    //新增热词弹窗显示
    show(index) {
      this.dialogVisible = true;
      if (index === -1) {
        index = this.keyList.length + 1;
        this.addHotForm = {
          type: "0",
          keyWork: "",
          link: "",
          linkTitle: ""
        };
      } else {
        this.addHotForm = JSON.parse(JSON.stringify(this.keyList[index]));
      }
      this.activeKeyFormIndex = index;
    },
    //保存热词
    saveHotkey() {
      this.$refs.keyForm.validate(valid => {
        if (valid) {
          if (this.activeKeyFormIndex > this.keyList.length) {
            this.keyList.push(this.addHotForm);
          } else {
            this.keyList[this.activeKeyFormIndex] = this.addHotForm;
          }
          this.hide();
        }
      });
    },
    //删除热词
    //index   被删除热词的索引
    deleteHotKey(index) {
      this.keyList.splice(index, 1);
    },
    //搜索关键词链接显示
    //index  搜索索引值
    selectLinkShow() {
      const index = this.activeKeyFormIndex;
      let navDetail = {
        url: this.addHotForm.link,
        urlTitle: this.addHotForm.linkTitle
      };
      this.$refs.pageLinkSelect.show(navDetail, index);
    },
    //链接选择确认
    //link       链接具体值
    //index      关键词索引值
    //category   页面分类名称
    selectLinkConfirm(link, index, category) {
      this.addHotForm.link = link.url;
      this.addHotForm.linkTitle = `${category} - ${link.urlTitle}`;
    }
  },
  components: {
    PageLinkSelect,
    Draggable,
    MainScroll
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.shop-search-warpper {
  .gray-bg-warpper {
    text-align: left;
    padding-bottom: 50px;
    padding-top: 20px;
    & > .header {
      margin-top: 15px;
      span {
        font-size: 13px;
      }
      span:nth-of-type(1) {
        padding: 0px 20px;
      }
      .el-button {
        margin-right: 20px;
      }
    }
    .search-list {
      width: 550px;
      border-radius: 5px;
      margin-top: 10px;
      margin-left: 94px;
      background-color: #fff;
      border: 1px solid #dcdfe6;
      .list-header {
        display: flex;
        font-size: 13px;
        align-items: center;
        height: 50px;
        font-weight: bold;
        & > div:nth-of-type(1),
        & > div:nth-of-type(2) {
          flex: 1;
        }
        & > div:nth-of-type(3) {
          width: 150px;
        }
        div {
          padding-left: 10px;
        }
      }
      ul {
        display: flex;
        flex-direction: column;
        .sortable-drag {
          border: none;
          background-color: #fff;
        }
        li {
          display: flex;
          font-size: 13px;
          align-items: center;
          height: 50px;
          border-top: 1px solid #dcdfe6;
          & > div:nth-of-type(1),
          & > div:nth-of-type(2) {
            flex: 1;
          }
          & > div:nth-of-type(3) {
            width: 150px;
            & > .el-button {
              margin-right: 10px;
            }
          }
          div {
            padding-left: 10px;
          }
        }
      }
    }
  }
}
.add-hot-dialog {
  .el-dialog__header {
    span {
      font-size: 14px;
      font-weight: bold;
    }
  }
  ::v-deep .el-dialog__body {
    .el-form {
      .el-form-item {
        .el-form-item__label {
          font-size: 13px;
        }
        .el-form-item__content {
          .el-input {
            width: 230px;
          }
          .el-radio-group {
            .el-radio {
              .el-radio__label {
                font-size: 13px;
                color: $routine-text-color;
                font-weight: 400;
              }
            }
          }
        }
      }
      .el-form-item:nth-of-type(3) {
        .el-button {
          margin-right: 10px;
        }
        span {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
