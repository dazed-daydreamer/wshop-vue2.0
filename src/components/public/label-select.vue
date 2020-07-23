<template>
  <div class="label-select-warpper">
    <l-dialog ref="dialog" title="选择标签" @confirm="labelConfirm">
      <div class="selecting-box" slot="category">
        <div>
          <div class="selecting-header">
            <span>已选标签</span>
            <span>({{ labeActive.length }}/10)</span>
          </div>
          <ul>
            <li
              v-for="(item, index) in labeActive"
              :key="index"
              @click="delectLabel(index)"
            >
              <span class="label"> {{ item.label }}</span>
              <span class="el-icon-close"></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="label-select-dialog">
        <div class="preview-operate">
          <ul>
            <li
              v-for="(item, index) in labelList"
              :key="index"
              @click="changeLabel(item)"
              :class="{ active: getLabelSelecting(item) }"
            >
              <span>
                {{ item.label }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </l-dialog>
  </div>
</template>

<script>
import LDialog from "./l-dialog.vue";
export default {
  data() {
    return {
      //标签列表
      labelList: [
        {
          id: 0,
          label: "最新"
        },
        {
          id: 1,
          label: "最热"
        },
        {
          id: 2,
          label: "清仓"
        },
        {
          id: 3,
          label: "特价"
        },
        {
          id: 4,
          label: "会员"
        }
      ],
      //当前图标
      labeActive: []
    };
  },
  methods: {
    //显示弹窗
    //labels  已选的标签
    show(labels) {
      if (labels != null) {
        this.labeActive = labels;
      }
      this.$refs.dialog.show();
    },
    //改变当前标签状态
    //item    标签的具体值
    changeLabel(item) {
      const index = this.labeActive.findIndex(val => val.id === item.id);
      if (index === -1) {
        this.labeActive.push(item);
      } else {
        this.labeActive.splice(index, 1);
      }
    },
    //取消当前标签状态
    //index    标签的索引值
    delectLabel(index) {
      this.labeActive.splice(index, 1);
    },
    //确认图标
    labelConfirm() {
      this.$emit("confirm", this.labeActive);
    },
    //获取当前标签是否已选中
    getLabelSelecting(item) {
      const index = this.labeActive.findIndex(val => val.id === item.id);
      return index === -1 ? false : true;
    }
  },
  components: { LDialog }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.selecting-box {
  width: 180px;
  height: 100%;
  background: #f2f2f6;
  & > div {
    display: flex;
    flex-direction: column;
    .selecting-header {
      margin-top: 10px;
      padding: 0px 10px;
      span {
        font-size: 13px;
        &:nth-of-type(2) {
          margin-left: 5px;
        }
      }
    }
    ul {
      flex: 1;
      margin: 0px;
      width: 100%;
      padding: 10px 0px;
      li {
        padding: 0px 10px;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 30px;
        display: flex;
        cursor: pointer;
        .label {
          font-size: 12px;
        }
        &:hover {
          background-color: rgba(144, 147, 153, 0.2);
        }
      }
    }
  }
}
.label-select-dialog {
  display: flex;
  height: 100%;
  .preview-operate {
    flex: 1;
    padding: 20px;
    ul {
      margin: 0px;
      display: flex;
      flex-wrap: wrap;
      li {
        background: #f2f2f6;
        border-radius: 4px;
        height: 30px;
        line-height: 30px;
        margin: 0 1.5% 10px 0;
        width: 18.5%;
        padding: 0 10px;
        float: left;
        cursor: pointer;
        span {
          font-size: 12px;
        }
        &.active {
          background: #d3e7ff;
          color: #2589ff;
        }
      }
    }
  }
}
</style>
