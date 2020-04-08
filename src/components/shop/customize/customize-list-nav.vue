<template>
  <div class="customize-list-nav-warpper">
    <ul>
      <li v-for="(item,index) in form.list" :key="index">
        <div>
          <span class="iconfont" :class="item.icon" v-if="form.iconShow"></span>
          <span class="title">{{item.title}}</span>
        </div>
        <span class="el-icon-arrow-right"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    //父组件传过来的表单
    form: {
      type: Object,
      default: {}
    }
  }
};
</script>


<style lang="scss">
.customize-list-nav-warpper {
  ul {
    margin: 0px;
    li {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 24px;
      border-bottom: 1px solid #ededed;
      div {
        display: flex;
        align-items: center;
        .iconfont {
          margin-right: 20px;
        }
        .title {
          font-size: 14px;
        }
      }
    }
  }
}
</style>