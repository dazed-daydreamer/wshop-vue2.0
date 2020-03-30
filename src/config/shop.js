//组件列表
export const shopComponentsList = [
    {
        title: '商品组',
        icon: 'icon-shangpin1',
        component: 'product',
        group: '商品类'
    },
    {
        title: '选项卡',
        icon: 'icon-fuhao-xuanxiangqia',
        component: 'tab',
        group: '商品类'
    },
    {
        title: '猜你喜欢',
        icon: 'icon-cainixihuan',
        component: 'like',
        group: '商品类'
    },
    {
        title: '商品排行',
        icon: 'icon-shangpinpaihang',
        component: 'ranking',
        group: '商品类'
    },
    {
        title: '公告',
        icon: 'icon-gonggao',
        component: 'notice',
        group: '图文类'
    },
    {
        title: '搜索框',
        icon: 'icon-chaxunsousuokuang',
        component: 'search',
        group: '图文类'
    },
    {
        title: '图片轮播',
        icon: 'icon-lunbotupian',
        component: 'slider',
        group: '图文类'
    },
    {
        title: '图片',
        icon: 'icon-tupian',
        component: 'picture',
        group: '图文类'
    },
    {
        title: '热区',
        icon: 'icon-xuxian',
        component: 'hot',
        group: '图文类'
    },
    {
        title: '图片展播',
        icon: 'icon-ai-img-list',
        component: 'pictures',
        group: '图文类'
    },
    {
        title: '魔方',
        icon: 'icon-mofang',
        component: 'cube',
        group: '图文类'
    },
    {
        title: '列表导航',
        icon: 'icon-liebiaodaohang',
        component: 'listNav',
        group: '图文类'
    },
    {
        title: '辅助线',
        icon: 'icon-fuzhuxiantiao',
        component: 'line',
        group: '图文类'
    },
    {
        title: '标题栏',
        icon: 'icon-biaotilan',
        component: 'title',
        group: '图文类'
    },
    {
        title: '富文本',
        icon: 'icon-fuwenben',
        component: 'richText',
        group: '图文类'
    },
    {
        title: '辅助空白',
        icon: 'icon-xuxian',
        component: 'blank',
        group: '图文类'
    },
    {
        title: '音频播放',
        icon: 'icon-yinpin_bofang',
        component: 'audio',
        group: '图文类'
    },
    {
        title: '按钮组',
        component: 'classification',
        icon: 'icon-fenlei',
        group: '图文类'
    },
    {
        title: '表单',
        component: 'form',
        icon: 'icon-biaodan',
        group: '图文类'
    },
    {
        title: '视频播放',
        component: 'video',
        icon: 'icon-shipinbofangyingpian',
        group: '图文类'
    },
    {
        title: '浮动按钮',
        component: 'float',
        icon: 'icon-fudonganniu',
        group: '图文类'
    },
    {
        title: '优惠券',
        icon: 'icon-youhuiquan1',
        component: 'coupon',
        group: '营销类'
    },
    {
        title: '拼团',
        icon: 'icon-pintuanzhong',
        component: 'group',
        group: '营销类'
    },
    {
        title: '秒杀',
        icon: 'icon-miaosha',
        component: 'spike',
        group: '营销类'
    },
    {
        title: '倒计时',
        icon: 'icon-daojishi',
        component: 'countdown',
        group: '营销类'
    },
    {
        title: '砍价',
        icon: 'icon-kanjia',
        component: 'bargain',
        group: '营销类'
    },
    {
        title: '直播',
        icon: 'icon-zhibo',
        component: 'live',
        group: '营销类'
    },
    {
        title: '弹窗广告',
        component: 'popUps',
        icon: 'icon-show_viphuiyuanguanggao',
        group: '其他组件'
    }
]

//商品组初始化数据
export const shopComponentsProductInit = {
    style: 0,
    productList: [
        {
            title: "这里是商品标题",
            subtitle: "这里是商品副标题",
            price: 20,
            original: 30,
            sales: 0
        },
        {
            title: "这里是商品标题",
            subtitle: "这里是商品副标题",
            price: 20,
            original: 30,
            sales: 0
        },
        {
            title: "这里是商品标题",
            subtitle: "这里是商品副标题",
            price: 20,
            original: 30,
            sales: 0
        }
    ],
    original: false,
    buyStyle: 0,
    title: true,
    subtitle: true,
    price: true,
    sales: false,
    member: false,
    sign: false,
    signTitle: "推荐",
    product: 0,
    sort: 0,
    sortType: 0
}


//选项卡初始化数据
export const shopComponentsTabInit = {
    style: 0,
    tabList: [
        {
            title: "选项",
            product: [
                {
                    title: "这里是商品标题",
                    subtitle: "这里是商品副标题",
                    price: 20,
                    original: 30,
                    sales: 0
                },
                {
                    title: "这里是商品标题",
                    subtitle: "这里是商品副标题",
                    price: 20,
                    original: 30,
                    sales: 0
                },
                {
                    title: "这里是商品标题",
                    subtitle: "这里是商品副标题",
                    price: 20,
                    original: 30,
                    sales: 0
                }
            ]
        },
        {
            title: "选项",
            product: [
                {
                    title: "这里是商品标题",
                    subtitle: "这里是商品副标题",
                    price: 20,
                    original: 30,
                    sales: 0
                }
            ]
        }
    ],
    original: false,
    buyStyle: 0,
    title: true,
    subtitle: true,
    price: true,
    sales: false,
    sign: false,
    signTitle: "推荐",
    product: 0,
    sort: 0,
    sortType: 0,
    currentTab: 0
}

//猜你喜欢初始化数据
export const shopComponentsLikeInit = {
    style: 0,
    title: '猜你喜欢',
    titleShow: true,
    count: 1,
}


//商品排行初始化数据
export const shopComponentsRankingInit = {
    style: 0,
    title: '商品排行',
    titleShow: true,
    count: 1,
    classify: 0,
    keyWord: ''
}

//公告初始化数据
export const shopComponentsNoticeInit = {
    notice: '由于天气原因，近期物流会推迟发货',
    style: 0,
    padding: 5
}

//搜索框初始化数据
export const shopComponentsSearchInit = {
    iconColor: '#fd463e',
    titleColor: '#999999',
    radiusStyle: 0,
    placeholder: '补水面膜',
    placeholderStyle: 0
}

//轮播图初始化数据
export const shopComponentsSliderInit = {
    dotStyle: 0,
    positionStyle: 1,
    slider: [{
        img: '',
        url: '',
    }, {
        img: '',
        url: '',
    }]
}

//图片初始化数据
export const shopComponentsPictureInit = {
    style:0,
    picture: [{
        img: '',
        url: '',
    }, {
        img: '',
        url: '',
    }]
}