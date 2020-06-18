import Mock from "mockjs";

Mock.mock("/api/shop/list", {
  "list|1-10": [
    {
      "title|1": ["测试页面1", "测试页面2", "测试页面4"],
      "state|1": ["已发布", "未发布", "取消发布"],
      date: "2020-03-11 11:11:14"
    }
  ]
});

Mock.mock("/api/shop/tabbar", [
  {
    icon: "icon-shouye",
    title: "首页",
    url: "home",
    urlTitle: "首页"
  },
  {
    icon: "icon-fenlei-xianxing",
    title: "分类",
    url: "classification",
    urlTitle: "分类"
  },
  {
    icon: "icon-gouwuche2",
    title: "购物车",
    url: "cart",
    urlTitle: "购物车"
  },
  {
    icon: "icon-wode",
    title: "我的",
    url: "mine",
    urlTitle: "我的"
  }
]);

Mock.mock("/api/shop/link", {
  features: [
    {
      url: "home",
      urlTitle: "首页"
    },
    {
      url: "classification",
      urlTitle: "分类"
    },
    {
      url: "cart",
      urlTitle: "购物车"
    },
    {
      url: "mine",
      urlTitle: "我的"
    }
  ],
  decoration: [
    {
      url: "zhuangxiu",
      urlTitle: "装修1"
    },
    {
      url: "zhuangxiu",
      urlTitle: "装修2"
    },
    {
      url: "zhuangxiu",
      urlTitle: "装修3"
    },
    {
      url: "zhuangxiu",
      urlTitle: "装修4"
    }
  ]
});
