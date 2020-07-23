<template>
  <div class="edit-btn-warpper">
    <el-input
      v-model="localValue"
      size="small"
      v-if="visible"
      ref="editInput"
      @blur="hide"
    ></el-input>
    <span @click="show" v-else>{{ localValue }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      localValue: "",
      visible: false
    };
  },

  props: {
    //父组件传的值
    value: {
      type: String,
      default: ""
    },
    //表单是否禁用
    disable: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    //输入框显示
    show() {
      if (!this.disable) {
        this.visible = true;
        this.$nextTick(() => {
          this.$refs.editInput.$refs.input.focus();
        });
      }
    },
    //输入框隐藏
    hide() {
      this.visible = false;
      this.$emit("inputConfirm", this.localValue);
    }
  },

  computed: {
    //监听父组件的值是否改变
    isValueChange() {
      return this.value;
    }
  },
  watch: {
    //父组件的值改变也改变该组件的值
    isValueChange() {
      this.localValue = this.value;
    }
  }
};
</script>

<style lang="scss" scoped>
.edit-btn-warpper {
  width: 100%;
  height: 32px;
  & > span {
    display: inline-block;
    line-height: 32px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    white-space: nowrap;
    max-width: 100%;
    text-overflow: ellipsis;
  }
}
</style>
