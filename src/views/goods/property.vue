<template>
  <main-scroll>
    <div class="product-property-warpper public-warpper">
      <div class="gray-bg-warpper">
        <div class="property-header">
          <el-button size="small" plain @click="propertyFormShow">
            新增属性
          </el-button>
          <span
            >商品属性将补充至商品信息中，商家需在编辑商品时选择对应的属性值，可用于手机端的筛选。最多支持10个属性。</span
          >
        </div>
        <div class="property-table">
          <el-table :data="tableData" stripe>
            <el-table-column prop="name" label="标签名称"> </el-table-column>
            <el-table-column label="筛选支持模块">
              <template slot-scope="scope">
                <span>{{ scope.row.list === "1" ? "商品列表页" : "--" }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序" max-width="150">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="propertyFormShow(scope.row)"
                  type="text"
                  size="small"
                  >编辑</el-button
                >
                <el-popover v-model="scope.row.visible">
                  <span v-if="scope.row.value.length === 0"
                    >删除后无法恢复，确认将这属性删除？</span
                  >
                  <span v-else>{{
                    `该属性已被 ${scope.row.value.length} 个商品使用，
                    请编辑商品并取消使用该属性后再进行删除`
                  }}</span>
                  <div style="text-align: right; margin: 0">
                    <div v-if="scope.row.value.length === 0">
                      <el-button
                        size="mini"
                        type="text"
                        @click="scope.row.visible = false"
                        >取消</el-button
                      >
                      <el-button
                        type="primary"
                        size="mini"
                        @click="propertyItemDelete(scope.row)"
                        >确定</el-button
                      >
                    </div>
                    <div v-else>
                      <el-button
                        plain
                        size="mini"
                        @click="scope.row.visible = false"
                        >取消</el-button
                      >
                    </div>
                  </div>
                  <el-button slot="reference" type="text" size="small"
                    >删除</el-button
                  >
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      width="800px"
      class="property-dialog"
      :before-close="propertyFormClose"
      append-to-body
    >
      <div slot="title">
        <span>商品属性</span>
      </div>
      <el-form :rules="rules" :model="form" label-width="100px" ref="form">
        <el-form-item label="属性名称" prop="name">
          <el-input
            v-model="form.name"
            size="small"
            placeholder="请输入属性名称"
            maxlength="10"
            show-word-limit
            class="w-360"
          ></el-input>
        </el-form-item>

        <el-form-item label="排序">
          <el-input
            v-model="form.sort"
            size="small"
            placeholder="请输入排序"
            class="w-360"
          ></el-input>
        </el-form-item>

        <el-form-item label="筛选支持模块">
          <el-checkbox v-model="form.list" true-label="1" false-label="0"
            >商品列表页筛选</el-checkbox
          >
          <span
            class="introduction
"
            >开启后，在商城全部商品列表可按该属性进行筛选，建议在商品信息中选择属性值后再开启</span
          >
        </el-form-item>

        <el-form-item label="属性值">
          <el-input
            v-model="form.addVlue"
            size="small"
            placeholder="请输入属性值"
            class="w-360"
          >
            <el-button slot="append" @click="addPropertyValue">新增</el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="propertyFormClose" size="small">取 消</el-button>
        <el-button type="primary" @click="propertyFormConfirm" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </main-scroll>
</template>

<script>
import MainScroll from "components/public/main-scroll.vue";
export default {
  data() {
    return {
      //表格数据
      tableData: [],
      //弹窗状态
      dialogVisible: false,
      //添加修改属性表单
      form: {},
      //表单验证规则
      rules: {
        name: [{ required: true, message: "请输入标签名称", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getPropertyList();
  },
  methods: {
    //获取属性列表
    getPropertyList() {
      this.tableData = [
        {
          name: "系统",
          sort: "0",
          list: "1",
          value: [
            {
              name: "ios"
            },
            {
              name: "安卓"
            }
          ]
        },
        {
          name: "形状",
          sort: "0",
          list: "0",
          value: [
            {
              name: "圆形"
            },
            {
              name: "方形"
            },
            {
              name: "三角形"
            }
          ]
        },
        {
          name: "材质",
          sort: "1",
          list: "0",
          value: [
            {
              name: "木质"
            },
            {
              name: "金属"
            }
          ]
        },
        {
          name: "功效",
          sort: "0",
          list: "1",
          value: [
            {
              name: "洁面"
            },
            {
              name: "滋润"
            }
          ]
        },
        {
          name: "产品类别",
          sort: "0",
          list: "1",
          value: []
        }
      ];
      this.tableData.forEach(item => {
        this.$set(item, "visible", false);
      });
    },
    //属性弹窗显示
    propertyFormShow() {
      this.form = {
        list: "1"
      };
      this.dialogVisible = true;
    },
    //属性弹窗关闭
    propertyFormClose() {
      this.$refs.form.clearValidate();
      this.dialogVisible = false;
    },
    //属性弹窗确认
    propertyFormConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除属性
    //item    属性具体值
    propertyItemDelete(item) {
      item.visible = false;
    },
    //新增属性属性值
    addPropertyValue() {}
  },
  components: {
    MainScroll
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.product-property-warpper {
  .gray-bg-warpper {
    .property-header {
      padding: 20px;
      border-radius: 5px;
      background-color: #fff;
      text-align: left;
      .el-button {
        color: $theme-color;
        border-color: $theme-color;
      }
      & > span {
        margin-left: 10px;
        font-size: 12px;
        color: $secondary-text-color;
      }
    }
    .property-table {
      width: 100%;
      margin-top: 10px;
      border-radius: 5px;
      overflow: hidden;
      border: 1px solid #e3e2e5;
      .el-table {
        width: 100%;
        font-size: 12px;
        span {
          & > .el-button {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
.el-popover {
  & > span {
    display: inline-block;
    margin: 1em 0px;
  }
}
.property-dialog {
  .el-dialog__header {
    span {
      font-size: 14px;
      font-weight: bold;
    }
  }
  .el-dialog__body {
    .el-form {
      ::v-deep .el-form-item {
        .el-form-item__label {
          font-size: 13px;
        }
        .el-form-item__content {
          .w-360 {
            width: 360px;
          }
          .el-checkbox {
            .el-checkbox__label {
              font-size: 12px;
            }
          }
          .introduction {
            display: inline-block;
            margin-left: 15px;
            font-size: 12px;
            color: $secondary-text-color;
          }
        }
      }
    }
  }
}
</style>
