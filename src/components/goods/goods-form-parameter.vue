<template>
  <div class="parameter-warpper">
    <ul>
      <li v-for="(item, index) in parameterList" :key="index">
        <span>
          {{ item.title }}
        </span>

        <el-dropdown
          trigger="click"
          :hide-on-click="false"
          :ref="`parameterDropdown${index}`"
        >
          <el-button plain size="small">
            <span class="value">{{
              item.value ? item.value : "请选择参数值"
            }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" class="parameter-dropdown">
            <el-dropdown-item>
              <el-input
                size="small"
                v-model="item.addValue"
                maxlength="20"
                show-word-limit
              >
                <template slot="append">
                  <div
                    @click="
                      addParameterValue(item, `parameterDropdown${index}`)
                    "
                  >
                    新增
                  </div>
                </template>
              </el-input>
            </el-dropdown-item>
            <el-dropdown-item
              v-for="(valueItem, valueIndex) in item.parameterValueList"
              :key="valueIndex"
            >
              <div
                @click="
                  dropdownSelect(valueItem, item, `parameterDropdown${index}`)
                "
              >
                <span>{{ valueItem.title }}</span>
                <span
                  class="el-icon-close"
                  @click.stop="
                    closeValueItem(item.parameterValueList, valueIndex, true)
                  "
                ></span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-button size="small" type="text" @click="removeParameterItem(index)">
          移除
        </el-button>
      </li>
    </ul>
    <div class="add-parameter">
      <el-autocomplete
        value-key="title"
        class="inline-input"
        v-model="parameterInput"
        :fetch-suggestions="parameterSearch"
        placeholder="请选择或输入值"
        @select="
          parameterSelect($event, 'parameterInputShow', 'parameterInput')
        "
        v-if="parameterInputShow"
        size="small"
        ref="parameterInput"
        @blur="inputHide('parameterInputShow', 'parameterInput')"
      >
        <template slot="append">
          <div class="addBtn" @click="addParameter">新增</div>
        </template>
      </el-autocomplete>
      <el-button
        size="small"
        plain
        v-else
        @click="inputShow('parameterInputShow', 'parameterInput')"
      >
        新增参数
      </el-button>
      <span
        >增加参数和参数值后请勿随意删除，删除后其他引用该参数值的商品也将不显示该参数。</span
      >
    </div>

    <el-dialog
      :visible.sync="parameterDialogVisible"
      width="520px"
      :before-close="parameterDialogVisibleClose"
      class="parameter-dialog-warpper"
      append-to-body
    >
      <el-form
        :model="parameterForm"
        label-width="100px"
        :rules="parameterRules"
        ref="parameterForm"
      >
        <el-form-item label="参数名称" prop="name">
          <el-input size="small" v-model="parameterForm.name"></el-input>
        </el-form-item>

        <el-form-item label="参数值" prop="value">
          <el-input
            size="small"
            v-model="parameterForm.value"
            placeholder="回车确认,可添加多个"
            @keyup.enter.native="addParameterList"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <div class="label-list">
            <ul>
              <li v-for="(item, index) in parameterForm.valueList" :key="index">
                <el-tag
                  closable
                  @close="closeValueItem(parameterForm.valueList, index)"
                >
                  {{ item.title }}
                </el-tag>
              </li>
            </ul>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="parameterDialogVisibleClose" size="small"
          >取 消</el-button
        >
        <el-button type="primary" @click="addParameterConfirm" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var checkValue = (rule, value, callback) => {
      if (
        (value === "" || value == undefined) &&
        this.parameterForm.valueList == undefined
      ) {
        callback(new Error("必须填写参数值"));
      } else {
        callback();
      }
    };
    return {
      //新增商品参数显示
      parameterDialogVisible: false,
      //参数输入框显示
      parameterInputShow: false,
      //参数输入框数值
      parameterInput: "",
      //参数列表
      parameterList: [],
      //新增参数表单
      parameterForm: {},
      //新增商品参数表单验证
      parameterRules: {
        name: [
          { required: true, message: "必须填写参数名称", trigger: "blur" }
        ],
        value: [{ validator: checkValue, trigger: "blur" }]
      }
    };
  },
  methods: {
    //输入框显示
    //visible    显示的参数
    //ref        需要focus的ref
    inputShow(visible, ref) {
      this[visible] = true;
      this.$nextTick(() => {
        this.$refs[ref].$refs.input.focus();
      });
    },
    //输入框隐藏
    //visible    显示的参数
    //value      输入框的值
    inputHide(visible, value) {
      setTimeout(() => {
        this[visible] = false;
        this[value] = "";
      }, 400);
    },
    //添加新参数
    addParameter() {
      this.parameterInputShow = false;
      this.parameterDialogVisible = true;
      this.parameterForm.name = this.parameterInput;
      this.parameterInput = "";
    },
    //参数列表选择
    //item    参数具体值
    //visible    显示的参数
    //value      输入框的值
    parameterSelect(item, visible, value) {
      this[visible] = false;
      this[value] = "";
      this.$set(item, "parameterValueList", [
        {
          id: 0,
          title: "圆形"
        },
        {
          id: 1,
          title: "方形"
        }
      ]);
      this.parameterList.push(item);
    },
    //参数搜索
    //queryString  搜索字符窜
    //cb           回调
    parameterSearch(queryString, cb) {
      cb([
        {
          id: 0,
          title: "策划"
        },
        {
          id: 1,
          title: "参数"
        }
      ]);
    },
    //新增参数弹窗关闭
    parameterDialogVisibleClose() {
      this.parameterDialogVisible = false;
      this.parameterForm = {};
    },
    //下拉确认
    //value    确认的选项值
    //item     选项
    //ref      下拉菜单的ref
    dropdownSelect(value, item, ref) {
      this.$set(item, "value", value.title);
      this.$refs[ref][0].hide();
    },
    //添加新参数
    //item     参数的具体值
    //ref      下拉菜单的ref
    addParameterValue(item, ref) {
      this.$refs[ref][0].hide();
      this.$set(item, "value", item.addValue);
      this.$set(item, "addValue", "");
    },
    //添加商品新参数
    addParameterConfirm() {
      this.$refs.parameterForm.validate(valid => {
        if (valid) {
          let toValueList = [];
          if (this.parameterForm.value) {
            if (
              this.parameterForm.valueList == undefined ||
              this.parameterForm.valueList.length === 0
            ) {
              toValueList = [
                {
                  title: this.parameterForm.value
                }
              ];
            } else {
              this.parameterForm.valueList.push({
                title: this.parameterForm.value
              });
            }
          }
          this.parameterList.push({
            title: this.parameterForm.name,
            parameterValueList:
              toValueList.length > 0
                ? toValueList
                : this.parameterForm.valueList
          });
          this.parameterDialogVisibleClose();
        } else {
          return false;
        }
      });
    },
    //回车确认添加新参数的参数值
    addParameterList() {
      if (this.parameterForm.valueList == undefined) {
        this.$set(this.parameterForm, "valueList", []);
      }
      const index = this.parameterForm.valueList.findIndex(
        item => item.title === this.parameterForm.value
      );
      if (this.parameterForm.value != "" && index === -1) {
        this.parameterForm.valueList.push({
          title: this.parameterForm.value
        });
        this.parameterForm.value = "";
      }
      if (index != -1) {
        this.$message.error("请勿添加相同的参数值");
      }
    },
    //删除参数中某个参数值
    //list      参数值列表
    //index     删除参数值的索引
    closeValueItem(list, index, has) {
      if (has) {
        this.$confirm("确认要删除该参数值吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            list.splice(index, 1);
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
      } else {
        list.splice(index, 1);
      }
    },
    //删除参数值
    //index      参数值的索引
    removeParameterItem(index) {
      this.parameterList.splice(index, 1);
    },
    //返回参数列表
    returnParameterList() {
      return this.parameterList;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.parameter-warpper {
  background-color: white;
  padding: 15px 0 15px 15px;
  border-radius: 4px;
  max-width: 1000px;
  ul {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    li {
      margin-right: 25px;
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      span:nth-of-type(1) {
        width: 60px;
      }
      .el-dropdown {
        margin-right: 15px;
        .el-button {
          .value {
            width: 150px;
            display: inline-block;
            text-align: left;
            color: $secondary-text-color;
          }
        }
      }
    }
  }
  .add-parameter {
    .el-button {
      color: #2589ff !important;
      border-color: #2589ff !important;
    }
    .el-input {
      width: 250px;
    }
    & > span {
      margin-left: 20px;
      color: $secondary-text-color;
    }

    ::v-deep .el-input-group__append {
      padding: 0;
      .addBtn {
        cursor: pointer;
        width: 60px;
        text-align: center;
        height: 100%;
      }
    }
  }
}

.parameter-dialog-warpper {
  .el-form {
    ::v-deep .el-form-item {
      .label-list {
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            margin-right: 10px;
          }
        }
      }
      .el-form-item__label {
        font-size: 12px;
      }
    }
  }
}

.parameter-dropdown {
  li {
    &:nth-of-type(1) {
      margin-bottom: 10px;
      background-color: #fff;
      .el-input {
        ::v-deep .el-input-group__append {
          text-align: center;
          cursor: pointer;
          width: 50px;
          padding: 0 !important;
        }
      }
    }
    &:not(:nth-of-type(1)) {
      & > div {
        display: flex;
        span:nth-of-type(1) {
          flex: 1;
        }
        .el-icon-close {
          width: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
