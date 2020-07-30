<template>
  <main-scroll>
    <div class="product-classify-warpper public-warpper">
      <div class="gray-bg-warpper">
        <div class="draggable-header">
          <div>
            <el-button
              plain
              size="small"
              @click="foldedChange"
              :icon="
                expandedState ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
              "
            >
              <span>{{ expandedState ? "折叠全部" : "展开全部" }}</span>
            </el-button>
            <span class="prompt">
              拖拽可调整分组顺序，保存生效
            </span>
          </div>
          <el-button plain size="small" @click="classifyHandleShow('1')"
            >新增一级分组</el-button
          >
        </div>
        <draggable tag="el-collapse" v-bind="dragOptions" ref="collapse">
          <el-collapse-item
            v-for="(item, index) in classifyList"
            :key="index"
            :name="`${index}`"
            :class="{ empty: item.second.length === 0 }"
          >
            <template slot="title">
              <div class="collapse-header">
                <div>
                  <span class="el-icon-caret-top"></span>
                  <span class="el-icon-caret-bottom"></span>
                  <span>{{ item.first }}</span>
                </div>
                <div>
                  <div @click.stop>
                    <span>显示分组</span>
                    <el-switch
                      v-model="item.show"
                      active-value="1"
                      inactive-value="0"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      @change="firstShowChange($event, item)"
                    >
                    </el-switch>
                  </div>
                  <div>
                    <el-button type="text" @click.stop="classifyHandleShow('2')"
                      >新增二级分组</el-button
                    >
                    <el-button
                      type="text"
                      @click.stop="classifyHandleShow('1', item)"
                      >编辑</el-button
                    >
                    <el-popconfirm
                      :title="
                        item.second.length
                          ? `该分类下拥有${item.second.length}个二级分类，是否继续删除？`
                          : '确认要删除该分类？'
                      "
                      @onConfirm="removeClassify('first', classifyList, index)"
                    >
                      <el-button type="text" slot="reference" @click.stop
                        >删除</el-button
                      >
                    </el-popconfirm>
                  </div>
                </div>
              </div>
            </template>
            <ul>
              <li v-for="(sItem, sIndex) in item.second" :key="sIndex">
                <div>
                  <el-image :src="sItem.image" fit="cover">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <span>{{ sItem.title }}</span>
                </div>
                <div>
                  <span>商品数量:</span>
                  <span>{{ sItem.count ? sItem.count : "0" }}</span>
                </div>
                <div>
                  <div @click.stop>
                    <span>显示分组</span>
                    <el-switch
                      v-model="sItem.show"
                      active-value="1"
                      inactive-value="0"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    >
                    </el-switch>
                  </div>
                  <el-button
                    type="text"
                    @click.stop="classifyHandleShow('2', sItem)"
                    >编辑</el-button
                  >

                  <el-popconfirm
                    :title="
                      sItem.count
                        ? `该分类已有${sItem.count}个产品，是否继续删除？`
                        : '确认要删除该分类？'
                    "
                    @onConfirm="removeClassify('second', item.second, sIndex)"
                  >
                    <el-button type="text" slot="reference">删除</el-button>
                  </el-popconfirm>
                </div>
              </li>
            </ul>
          </el-collapse-item>
        </draggable>
      </div>
    </div>

    <div class="footer-btn" slot="footer">
      <div>
        <el-button size="medium" @click="save" type="primary">保存</el-button>
      </div>
    </div>

    <el-dialog
      :visible.sync="classifyDialogVisible"
      width="420px"
      :before-close="classifyHandleClose"
      class="classify-dialog-warpper"
      append-to-body
    >
      <el-form
        :model="classifyForm"
        label-width="120px"
        :rules="classifyRules"
        ref="classifyForm"
      >
        <div v-if="classifyForm.level === '1'">
          <el-form-item label="一级分类名称" prop="first">
            <el-input v-model="classifyForm.first" size="small"></el-input>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="上级分类" prop="firstId">
            <el-select
              v-model="classifyForm.firstId"
              placeholder="请选择上级分类"
              size="small"
            >
              <el-option
                v-for="item in classifyList"
                :key="item.first"
                :label="item.first"
                :value="item.first"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类名称" prop="title">
            <el-input v-model="classifyForm.title" size="small"></el-input>
          </el-form-item>
          <el-form-item label="二级分类图片" prop="secondImage">
            <el-button size="small" @click="imageSelectShow"
              >上传图片</el-button
            >
          </el-form-item>
        </div>
        <el-form-item label="分类状态">
          <el-radio-group v-model="classifyForm.show">
            <el-radio label="1">显示</el-radio>
            <el-radio label="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="classifyHandleClose" size="small">取 消</el-button>
        <el-button type="primary" @click="addClassifyConfirm" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <image-select ref="imageSelect"></image-select>
  </main-scroll>
</template>

<script>
import MainScroll from "components/public/main-scroll.vue";
import Draggable from "vuedraggable";
import ImageSelect from "@/components/public/image-select.vue";
export default {
  data() {
    return {
      //商品分类列表
      classifyList: [],
      //拖拽配置
      dragOptions: {
        filter: ".disabled"
      },
      //展开状态 默认全部展开状态
      expandedState: false,
      //分类弹窗显示
      classifyDialogVisible: false,
      //分类表单
      classifyForm: {
        level: "1",
        show: "1"
      },
      //新增商品表单验证
      classifyRules: {
        first: [{ required: true, message: "必须填写名称", trigger: "blur" }],
        title: [{ required: true, message: "必须填写名称", trigger: "blur" }],
        firstId: [
          { required: true, message: "必须选择上级分类", trigger: "blur" }
        ],
        secondImage: [
          { required: true, message: "必须上传图片", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getClassifyList();
  },
  mounted() {
    this.foldedChange();
  },
  methods: {
    //获取商品分类列表
    getClassifyList() {
      this.classifyList = [
        {
          first: "男装女装",
          show: "1",
          second: []
        },
        {
          first: "手机电脑",
          show: "1",
          second: [
            {
              title: "手机",
              show: "1",
              count: "",
              image:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596088854471&di=73c6642be58f12417c59966e96235711&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F39%2F53%2F98%2F5904377a0152e.png"
            },
            {
              title: "电脑",
              show: "1",
              count: "",
              image:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596088854471&di=73c6642be58f12417c59966e96235711&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F39%2F53%2F98%2F5904377a0152e.png"
            },
            {
              title: "手提电脑",
              show: "1",
              count: "10000",
              image:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596088854471&di=73c6642be58f12417c59966e96235711&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F39%2F53%2F98%2F5904377a0152e.png"
            },
            {
              title: "平板电脑",
              show: "1",
              count: "20",
              image:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596088854471&di=73c6642be58f12417c59966e96235711&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F39%2F53%2F98%2F5904377a0152e.png"
            }
          ]
        },
        {
          first: "母婴产品",
          show: "0",
          second: [
            {
              title: "平板电脑",
              show: "1",
              count: "20",
              image:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596088854471&di=73c6642be58f12417c59966e96235711&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F39%2F53%2F98%2F5904377a0152e.png"
            }
          ]
        }
      ];
    },
    //折叠改变
    foldedChange() {
      this.expandedState = !this.expandedState;
      if (this.expandedState) {
        let tem = [];
        this.classifyList.forEach((item, index) => {
          tem.push(`${index}`);
        });
        this.$refs.collapse.$children[0].setActiveNames(tem);
      } else {
        this.$refs.collapse.$children[0].setActiveNames([]);
      }
    },
    //保存排序
    save() {},
    //一级分类显示改变
    //val     状态
    //first    分类具体值
    firstShowChange(val, first) {
      first.second.forEach(item => {
        item.show = val;
      });
    },
    //分类弹窗显示
    //levle        弹窗显示的级别
    //value        如是编辑则把现有val赋予表单
    classifyHandleShow(level, value) {
      if (value) {
        this.classifyForm = value;
      } else {
        this.classifyForm = {
          show: "1"
        };
      }
      this.classifyForm.level = level;
      this.classifyDialogVisible = true;
    },
    //分类弹窗隐藏
    classifyHandleClose() {
      this.$refs.classifyForm.clearValidate();
      this.classifyDialogVisible = false;
    },
    //确认分类表单
    addClassifyConfirm() {
      this.$refs.classifyForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    },
    //清除分类
    //level   分类的等级
    //list    分类列表
    //index   删除分类的索引
    removeClassify(level, list, index) {
      list.splice(index, 1);
    },
    //图片选择显示
    imageSelectShow() {
      this.$refs.imageSelect.show();
    }
  },
  components: {
    MainScroll,
    Draggable,
    ImageSelect
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.product-classify-warpper {
  .gray-bg-warpper {
    padding-bottom: 40px;
    .draggable-header {
      height: 48px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding: 0px 10px;
      & > div {
        span.prompt {
          margin-left: 20px;
          font-size: 13px;
          color: $secondary-text-color;
        }
      }
    }
    .el-collapse {
      border: none;
      ::v-deep .el-collapse-item {
        margin-bottom: 10px;

        &.is-active:not(.empty) {
          .el-collapse-item__header {
            border-bottom: 1px solid #ebeef5;
          }
        }
        &.empty {
          .el-collapse-item__wrap {
            border: none;
          }
        }

        &.is-active {
          .el-icon-caret-bottom {
            display: none !important;
          }
          .el-icon-caret-top {
            display: block !important;
          }
        }

        .el-collapse-item__header {
          border-bottom: 1px solid transparent;
          .collapse-header {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 0px 15px;
            & > div {
              display: flex;
              align-items: center;
              .el-icon-caret-top {
                display: none;
                margin-right: 5px;
              }
              .el-icon-caret-bottom {
                display: block;
                margin-right: 5px;
              }
              & > div:nth-of-type(1) {
                margin-right: 100px;
                display: flex;
                align-items: center;
                & > span {
                  margin-right: 20px;
                }
              }
              & > div:nth-of-type(2) {
                span {
                  .el-button {
                    margin-left: 10px;
                  }
                }
              }
              span {
                font-size: 13px;
                font-weight: 400;
              }
              .el-button {
                span {
                  color: $theme-btn-color;
                }
              }
            }
          }
          .el-collapse-item__arrow {
            display: none;
          }
        }
        .el-collapse-item__wrap {
          .el-collapse-item__content {
            padding: 0px;
            ul {
              li {
                height: 50px;
                display: flex;
                align-items: center;
                padding: 0px 15px;
                justify-content: space-between;
                & > div {
                  align-items: center;
                  display: flex;
                  &:nth-of-type(1) {
                    width: 200px;
                    margin-left: 150px;
                    .el-image {
                      width: 36px;
                      height: 36px;
                      border-radius: 5px;
                      margin-right: 20px;
                    }
                  }
                  &:nth-of-type(2) {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    span:nth-of-type(2) {
                      color: $theme-btn-color;
                      width: 40px;
                      margin-left: 3px;
                      text-align: left;
                    }
                  }
                  &:nth-of-type(3) {
                    & > div {
                      margin-right: 185px;
                      display: flex;
                      align-items: center;
                      & > span {
                        margin-right: 20px;
                      }
                    }
                    span {
                      .el-button {
                        margin-left: 10px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.classify-dialog-warpper {
  .el-dialog {
    .el-dialog__body {
      .el-form {
        ::v-deep .el-form-item {
          .el-form-item__label {
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>
