const actions = {
  //通知自定义页面表单被改变
  feedBackForm(context, item) {
    context.commit("setCurrentComponentItem", item);
    context.commit("setCurrentComponentItemFormChange", true);
  }
};

export default actions;
