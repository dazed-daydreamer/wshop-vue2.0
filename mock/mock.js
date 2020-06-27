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
    },
    {
      url: "zhuangxiu",
      urlTitle: "装修5"
    },
    {
      url: "zhuangxiu",
      urlTitle: "装修6"
    },
    {
      url: "zhuangxiu",
      urlTitle: "装修7"
    },
    {
      url: "zhuangxiu",
      urlTitle: "装修8"
    },
    {
      url: "zhuangxiu",
      urlTitle: "装修9"
    },
    {
      url: "zhuangxiu",
      urlTitle: "装修10"
    },
    {
      url: "zhuangxiu",
      urlTitle: "装修11"
    },
    {
      url: "zhuangxiu",
      urlTitle: "装修12"
    }
  ]
});

Mock.mock("/api/shop/user", {
  userHeaderBackgroundColor: "#CCCCCC",
  userHeadeTextrColor: "#FFFFFF",
  userHeaderMemberBackgroundColor: "#828282",
  userHeaderMemberTextColor: "#FFFFFF",
  userHeaderText: "获取会员专享权益",
  hasMember: true,
  hasHeader: true,
  hasRecording: true,
  hasOrder: true,
  hasPicNavOne: false,
  hasPicNavTwo: false,
  hasMenu: true,
  hasDistribution: false,
  hasMenuDistribution: true,
  hasMenuGroup: true,
  hasMenuCoupon: true,
  hasMenuAddress: true,
  hasMenuService: true,
  hasMenuSite: true,
  picNavOnePic: "",
  picNavOneLink: "",
  picNavOneLinkTitle: "",
  picNavTwoLink: "",
  picNavTwoPic: "",
  picNavTwoLinkTitle: "",
  distributionShowStatus: "0",
  distributionTitle: "分销中心",
  distributionCopywriting: "查看结算金额",
  menuStyle: "0"
});

Mock.mock("/api/shop/listStencil", {
  status: "0",
  sales: "0"
});
