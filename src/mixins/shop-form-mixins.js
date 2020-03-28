//自定义模板表单Mixin
export const shopFormMixins = {
    created() {
        //初始化本地表单
        this.localForm = Object.assign(
            this.localForm,
            JSON.parse(JSON.stringify(this.form))
        );
        //如果有其他的初始化需要,就触发
        if (this._initForm) {
            this.$nextTick(() => {
                this._initForm();
            });
        };
    },
    methods: {
        //获取风格图片
        getStyleImg() {
            this.styleImg = require(`assets/images/${
                this.stypeImgArr[this.localForm.style]
                }`);
        },
        //显示风格选择
        styleDialogShow() {
            this.styleIndex = this.localForm.style;
            this.$refs.stypeDialog.show();
        },
        //改变风格
        //index  改变到当前风格
        styleChange(index) {
            this.styleIndex = index;
        },
        //确认风格
        styleConfirm() {
            this.localForm.style = this.styleIndex;
            this.getStyleImg();
        }
    },
    watch: {
        //监听本地表单，如果有修改返回到自定义组件页面
        localForm: {
            deep: true,
            handler(val) {
                this.bus.$emit('formChange', val);
            }
        }
    }
}