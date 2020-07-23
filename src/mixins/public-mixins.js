//公共Mixin
export const publicMixins = {
  methods: {
    //加密字段
    encryption(string) {
      return escape(string);
    },
    //解密字段
    decrypt(string) {
      return unescape(string);
    },
    //日期格式转换
    dateFormatConversion(date) {
      var temDate = new Date(date);
      var month =
        temDate.getMonth() + 1 > 9
          ? temDate.getMonth() + 1
          : "0" + (temDate.getMonth() + 1);
      var day =
        temDate.getDate() > 9 ? temDate.getDate() : "0" + temDate.getDate();
      return temDate.getFullYear() + "-" + month + "-" + day;
    }
  }
};
