import Mock from 'mockjs';

export const pageList = Mock.mock('/api/shop/list', {
    "array|1-10": [
        {
            "title|1": [
                '测试页面1',
                '测试页面2',
                '测试页面4',
            ],
            "state|1": [
                '已发布',
                '未发布',
                '取消发布'
            ],
            date: '2020-03-11 11:11:14'
        }
    ]
});



export const shopComponentsList = Mock.mock('/api/shop/components', {
    "array": [
        {
            title: '轮播图',
            image: 'https://s1.ax1x.com/2020/03/13/8uqaGR.png',
            componentImage:'https://s1.ax1x.com/2020/03/14/81ppz8.jpg',
            component: 'slider',
            group: '1'
        },
        {
            title: '图片导航',
            image: 'https://s1.ax1x.com/2020/03/13/8uqrqO.png',
            componentImage:'https://s1.ax1x.com/2020/03/14/81SoRK.jpg',
            component: 'picture',
            group: '1'
        },
        {
            title: '商品模块',
            image: 'https://s1.ax1x.com/2020/03/13/8ubzUH.png',
            componentImage:'https://s1.ax1x.com/2020/03/14/81SOZd.png',
            component: 'goods',
            group: '1'
        },
        {
            title: '分类模块',
            image: 'https://s1.ax1x.com/2020/03/13/8uqdR1.png',
            componentImage:'https://s1.ax1x.com/2020/03/14/81SHMD.jpg',
            component: 'classify',
            group: '1'
        },
        {
            title: '消息快报',
            image: 'https://i.loli.net/2020/03/13/XqxjhbGaFk8RNBw.png',
            componentImage:'https://s1.ax1x.com/2020/03/14/81STxO.jpg',
            component: 'news',
            group: '1'
        },
        {
            title: '店铺头部',
            image: 'https://i.loli.net/2020/03/13/OiqyhXPT4EAZbwo.png',
            componentImage:'https://s1.ax1x.com/2020/03/14/81SIG6.png',
            logo:'https://s1.ax1x.com/2020/03/15/81p2Sf.jpg',
            component: 'ellipsis',
            group: '1'
        },
        {
            title: '定位菜单',
            image: 'https://i.loli.net/2020/03/13/RIAuzKbv2pfJZMP.png',
            componentImage:'https://s1.ax1x.com/2020/03/14/81Sxit.jpg',
            component: 'nav',
            group: '1'
        },
        {
            title: '店铺导航',
            image: 'https://i.loli.net/2020/03/13/4xwcjWf3R1TvCM9.png',
            componentImage:'https://s1.ax1x.com/2020/03/14/81SjII.jpg',
            component: 'position',
            group: '1'
        },
        {
            title: '搜索模块',
            image: 'https://i.loli.net/2020/03/13/u6cVzfFa1LPv84S.png',
            componentImage:'https://s1.ax1x.com/2020/03/14/81pPsg.png',
            component: 'search',
            group: '1'
        },
        {
            title: '左右图文',
            image: 'https://i.loli.net/2020/03/13/OjzcN7rdAyJU5pE.png',
            componentImage:'https://s1.ax1x.com/2020/03/14/81SzJP.jpg',
            component: 'pictext',
            group: '1'
        },
        {
            title: '标题栏',
            image: 'https://i.loli.net/2020/03/13/umUQ5EfVtajzN83.png',
            componentImage:'https://i.loli.net/2020/03/14/73aflD8FbBy4vnV.png',
            component: 'title',
            group: '1'
        },
        {
            title: '文本模块',
            image: 'https://i.loli.net/2020/03/13/r2x68LgUWDCKVA3.png',
            componentImage:'https://i.loli.net/2020/03/14/YK4N5IbT2f3Ovdw.jpg',
            component: 'texts',
            group: '1'
        },
        {
            title: '背景浮动导航',
            image: 'https://s1.ax1x.com/2020/03/14/8lvUbR.png',
            componentImage: 'https://i.loli.net/2020/03/14/xSbqFnEX7p92LAk.jpg',
            component: 'float',
            group: '1'
        },
        {
            title: '倒计时',
            image: 'https://i.loli.net/2020/03/13/ODSUyBronWT1zZF.png',
            componentImage: 'https://i.loli.net/2020/03/14/Qt1OjKl4hFi72wS.png',
            component: 'down',
            group: '1'
        },
        {
            title: '空白占位',
            image: 'https://i.loli.net/2020/03/13/2q548bNGgahjBe3.png',
            componentImage: 'https://i.loli.net/2020/03/14/qXlUJ7sphgFcI8k.jpg',
            component: 'blank',
            group: '1'
        },
        {
            title: '分隔符',
            image: 'https://i.loli.net/2020/03/13/k95UcwnMhItYdHf.png',
            componentImage: 'https://i.loli.net/2020/03/14/YsVW7FI9xLlR53n.png',
            component: 'separator',
            group: '1'
        },
        {
            title: '热区',
            image: 'https://i.loli.net/2020/03/13/LzsPdTgaUlSwqpm.png',
            componentImage: 'https://i.loli.net/2020/03/14/GJeWn8d5ZKXhfyE.jpg',
            component: 'hot',
            group: '1'
        },
        {
            title: '视频组件',
            component: 'video',
            image: 'https://i.loli.net/2020/03/13/GEUYuXntargFPxM.png',
            componentImage: 'https://i.loli.net/2020/03/14/PRhouJFnrX4CZLd.png',
            group: '1'
        },
        {
            title: '图文列表',
            component: 'article',
            image: 'https://s1.ax1x.com/2020/03/14/8lvTxg.png',
            componentImage: 'https://i.loli.net/2020/03/14/w7Ahakue3KXBWtJ.png',
            group: '1'
        },
        {
            title: '优惠卷',
            component: 'coupon',
            image: 'https://s1.ax1x.com/2020/03/14/8ldMDK.png',
            componentImage: 'https://i.loli.net/2020/03/14/ztrGAshfMP9ZR7J.jpg',
            group: '2'
        },
        {
            title: '限时折扣',
            component: 'limittime',
            image: 'https://s1.ax1x.com/2020/03/14/8lTcKP.png',
            componentImage: 'https://i.loli.net/2020/03/14/zSwHAeFXfCnylR2.jpg',
            group: '2'
        },
        {
            title: '砍价',
            image: 'https://s1.ax1x.com/2020/03/14/8ldQHO.png',
            componentImage: 'https://i.loli.net/2020/03/14/1d63FjZGfhPurBO.jpg',
            component: 'bargain',
            group: '2'
        },
        {
            title: '拼团',
            image: 'https://s1.ax1x.com/2020/03/14/8ld1ED.png',
            componentImage: 'https://i.loli.net/2020/03/14/qC4R6MvhF1iX5yu.jpg',
            component: 'group',
            group: '2'
        },
        {
            title: '满减满折',
            image: 'https://s1.ax1x.com/2020/03/14/8ldKu6.png',
            componentImage: 'https://i.loli.net/2020/03/14/oM8SFwxtYCZi3qO.jpg',
            component: 'fullcut',
            group: '2'
        },
        {
            title: '满包邮',
            image: 'https://s1.ax1x.com/2020/03/14/8lT2b8.png',
            componentImage: 'https://i.loli.net/2020/03/14/dyiphKNARuGZ8eO.png',
            component: 'fullfree',
            group: '2'
        },
        {
            title: 'N元N件',
            image: 'https://s1.ax1x.com/2020/03/14/8lTWVS.png',
            componentImage: 'https://i.loli.net/2020/03/14/mTjaDt3I92WzRS4.png',
            component: 'nynj',
            group: '2'
        },
        {
            title: '专题推荐',
            image: 'https://i.loli.net/2020/03/15/R1ykrYM6aBzAuLg.png',
            component: 'recommended',
            componentImage: 'https://i.loli.net/2020/03/14/VjGik4X2ZD5Qn8Y.png',
            group: '2'
        },
        {
            title: '直播',
            component: 'live',
            image: 'https://s1.ax1x.com/2020/03/14/8ldnjx.png',
            componentImage: 'https://i.loli.net/2020/03/14/jxXCudFeHLmUaoS.jpg',
            group: '2'
        }
    ]
})