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
    }
  }
};
