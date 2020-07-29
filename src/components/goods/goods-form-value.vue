<template>
  <div class="attributes-warpper">
    <ul>
      <li v-for="(item, index) in attributesList" :key="index">
        <span>
          {{ item.title }}
        </span>

        <el-dropdown
          trigger="click"
          :hide-on-click="false"
          :ref="`attributesDropdown${index}`"
        >
          <el-button plain size="small">
            <span class="value">{{
              item.value ? item.value : "请选择属性值"
            }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" class="attributes-dropdown">
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
                      addAttributesValue(item, `attributesDropdown${index}`)
                    "
                  >
                    新增
                  </div>
                </template>
              </el-input>
            </el-dropdown-item>
            <el-dropdown-item
              v-for="(valueItem, valueIndex) in item.attributesValueList"
              :key="valueIndex"
            >
              <div
                @click="
                  dropdownSelect(valueItem, item, `attributesDropdown${index}`)
                "
              >
                <span>{{ valueItem.title }}</span>
                <span
                  class="el-icon-close"
                  @click.stop="
                    closeValueItem(item.attributesValueList, valueIndex, true)
                  "
                ></span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-button
          size="small"
          type="text"
          @click="removeAttributesItem(index)"
        >
          移除
        </el-button>
      </li>
    </ul>
    <div class="add-attributes">
      <el-autocomplete
        value-key="title"
        class="inline-input"
        v-model="attributesInput"
        :fetch-suggestions="attributesSearch"
        placeholder="请选择或输入值"
        @select="
          attributesSelect($event, 'attributesInputShow', 'attributesInput')
        "
        v-if="attributesInputShow"
        size="small"
        ref="attributesInput"
        @blur="inputHide('attributesInputShow', 'attributesInput')"
      >
        <template slot="append">
          <div class="addBtn" @click="addAttributes">新增</div>
        </template>
      </el-autocomplete>
      <el-button
        size="small"
        plain
        v-else
        @click="inputShow('attributesInputShow', 'attributesInput')"
      >
        新增属性
      </el-button>
      <span
        >最多支持10个属性。商品属性可用于微信端商品列表和分类页的筛选，可在【商品属性】栏目中设置。</span
      >
    </div>

    <el-dialog
      :visible.sync="attributesDialogVisible"
      width="520px"
      :before-close="attributesDialogVisibleClose"
      class="attributes-dialog-warpper"
      append-to-body
    >
      <el-form
        :model="attributesForm"
        label-width="100px"
        :rules="attributesRules"
        ref="attributesForm"
      >
        <el-form-item label="属性名称" prop="name">
          <el-input size="small" v-model="attributesForm.name"></el-input>
        </el-form-item>

        <el-form-item label="属性值" prop="value">
          <el-input
            size="small"
            v-model="attributesForm.value"
            placeholder="回车确认,可添加多个"
            @keyup.enter.native="addAttributesList"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <div class="label-list">
            <ul>
              <li
                v-for="(item, index) in attributesForm.valueList"
                :key="index"
              >
                <el-tag
                  closable
                  @close="closeValueItem(attributesForm.valueList, index)"
                >
                  {{ item.title }}
                </el-tag>
              </li>
            </ul>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="attributesDialogVisibleClose" size="small"
          >取 消</el-button
        >
        <el-button type="primary" @click="addAttributesConfirm" size="small"
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
        this.attributesForm.valueList == undefined
      ) {
        callback(new Error("必须填写属性值"));
      } else {
        callback();
      }
    };
    return {
      //新增商品属性显示
      attributesDialogVisible: false,
      //属性输入框显示
      attributesInputShow: false,
      //属性输入框数值
      attributesInput: "",
      //属性列表
      attributesList: [],
      //新增属性表单
      attributesForm: {},
      //新增商品属性表单验证
      attributesRules: {
        name: [
          { required: true, message: "必须填写属性名称", trigger: "blur" }
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
      if (this.attributesList.length < 10) {
        this[visible] = true;
        this.$nextTick(() => {
          this.$refs[ref].$refs.input.focus();
        });
      } else {
        this.$message.error("商品属性最多支持10个属性");
      }
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
    //添加新属性
    addAttributes() {
      this.attributesInputShow = false;
      this.attributesDialogVisible = true;
      this.attributesForm.name = this.attributesInput;
      this.attributesInput = "";
    },
    //属性列表选择
    //item    属性具体值
    //visible    显示的参数
    //value      输入框的值
    attributesSelect(item, visible, value) {
      this[visible] = false;
      this[value] = "";
      this.$set(item, "attributesValueList", [
        {
          id: 0,
          title: "圆形"
        },
        {
          id: 1,
          title: "方形"
        }
      ]);
      this.attributesList.push(item);
    },
    //属性搜索
    //queryString  搜索字符窜
    //cb           回调
    attributesSearch(queryString, cb) {
      cb([
        {
          id: 0,
          title: "策划"
        },
        {
          id: 1,
          title: "属性"
        }
      ]);
    },
    //新增属性弹窗关闭
    attributesDialogVisibleClose() {
      this.attributesDialogVisible = false;
      this.attributesForm = {};
    },
    //下拉确认
    //value    确认的选项值
    //item     选项
    //ref      下拉菜单的ref
    dropdownSelect(value, item, ref) {
      this.$set(item, "value", value.title);
      this.$refs[ref][0].hide();
    },
    //添加新属性
    //item     属性的具体值
    //ref      下拉菜单的ref
    addAttributesValue(item, ref) {
      this.$refs[ref][0].hide();
      this.$set(item, "value", item.addValue);
      this.$set(item, "addValue", "");
    },
    //添加商品新属性
    addAttributesConfirm() {
      this.$refs.attributesForm.validate(valid => {
        if (valid) {
          let toValueList = [];
          if (this.attributesForm.value) {
            if (
              this.attributesForm.valueList == undefined ||
              this.attributesForm.valueList.length === 0
            ) {
              toValueList = [
                {
                  title: this.attributesForm.value
                }
              ];
            } else {
              this.attributesForm.valueList.push({
                title: this.attributesForm.value
              });
            }
          }
          this.attributesList.push({
            title: this.attributesForm.name,
            attributesValueList:
              toValueList.length > 0
                ? toValueList
                : this.attributesForm.valueList
          });
          this.attributesDialogVisibleClose();
        } else {
          return false;
        }
      });
    },
    //回车确认添加新属性的属性值
    addAttributesList() {
      if (this.attributesForm.valueList == undefined) {
        this.$set(this.attributesForm, "valueList", []);
      }
      const index = this.attributesForm.valueList.findIndex(
        item => item.title === this.attributesForm.value
      );
      if (this.attributesForm.value != "" && index === -1) {
        this.attributesForm.valueList.push({
          title: this.attributesForm.value
        });
        this.attributesForm.value = "";
      }
      if (index != -1) {
        this.$message.error("请勿添加相同的属性值");
      }
    },
    //删除属性中某个属性值
    //list      属性值列表
    //index     删除属性值的索引
    closeValueItem(list, index, has) {
      if (has) {
        this.$confirm("确认要删除该属性值吗？", "提示", {
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
    //删除属性值
    //index      属性值的索引
    removeAttributesItem(index) {
      this.attributesList.splice(index, 1);
    },
    //返回属性列表
    returnAttributesList() {
      return this.attributesList;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.attributes-warpper {
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
  .add-attributes {
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

.attributes-dialog-warpper {
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

.attributes-dropdown {
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
