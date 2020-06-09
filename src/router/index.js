import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "overview",
    component: Layout,
    redirect: "/overview/index",
    meta: {
      title: "概况",
      icon: "icon-gaikuang"
    },
    children: [
      {
        path: "/overview/index",
        name: "overview",
        meta: {
          title: "主页概况",
          group: "主页概况"
        },
        component: () => import("@/views/overview/index.vue")
      }
    ]
  },
  {
    path: "/shop",
    name: "shop",
    component: Layout,
    redirect: "/shop/index",
    meta: {
      title: "店铺",
      icon: "icon-shangdian"
    },
    children: [
      {
        path: "/shop/index",
        meta: {
          title: "店铺页面",
          group: "个性装修"
        },
        name: "shopPage",
        component: () => import("@/views/shop/index.vue")
      },
      {
        path: "/shop/step_1",
        name: "shopPageStep1",
        component: () => import("@/views/shop/addpage-step-one.vue")
      },
      {
        path: "/shop/step_2",
        name: "shopPageStep2",
        component: () => import("@/views/shop/addpage-step-two.vue")
      },
      {
        path: "/shop/navigation",
        meta: {
          title: "店铺导航",
          group: "个性装修"
        },
        name: "shopNavigation",
        component: () => import("@/views/shop/navigation.vue")
      },
      {
        path: "/shop/user",
        meta: {
          title: "用户中心",
          group: "系统页面"
        },
        name: "shopUser",
        component: () => import("@/views/shop/user.vue")
      },
      {
        path: "/shop/list",
        meta: {
          title: "列表模板",
          group: "系统页面"
        },
        name: "shopList",
        component: () => import("@/views/shop/list.vue")
      },
      {
        path: "/shop/classification",
        meta: {
          title: "分类模板",
          group: "系统页面"
        },
        name: "shopClassification",
        component: () => import("@/views/shop/classification.vue")
      },
      {
        path: "/shop/search",
        meta: {
          title: "搜索页",
          group: "系统页面"
        },
        name: "shopSearch",
        component: () => import("@/views/shop/search.vue")
      },
      {
        path: "/shop/theme",
        meta: {
          title: "店铺色系",
          group: "店铺风格"
        },
        name: "shopTheme",
        component: () => import("@/views/shop/theme.vue")
      }
    ]
  },
  {
    path: "/product",
    name: "product",
    component: Layout,
    redirect: "/product/index",
    meta: {
      title: "商品",
      icon: "icon-shangpin"
    },
    children: [
      {
        path: "/product/index",
        meta: {
          title: "全部商品",
          group: "商品管理"
        },
        name: "productAll",
        component: () => import("@/views/product/index.vue")
      },
      {
        path: "/product/group",
        meta: {
          title: "商品分组",
          group: "商品管理"
        },
        name: "productGroup",
        component: () => import("@/views/product/group.vue")
      },
      {
        path: "/product/label",
        meta: {
          title: "商品标签",
          group: "商品管理"
        },
        name: "productLabel",
        component: () => import("@/views/product/label.vue")
      },
      {
        path: "/product/template",
        meta: {
          title: "商详模板",
          group: "商品管理"
        },
        name: "productTemplate",
        component: () => import("@/views/product/template.vue")
      },
      {
        path: "/product/property",
        meta: {
          title: "商品属性",
          group: "商品管理"
        },
        name: "productProperty",
        component: () => import("@/views/product/property.vue")
      },
      {
        path: "/product/comment",
        meta: {
          title: "商详评论",
          group: "商品管理"
        },
        name: "productComment",
        component: () => import("@/views/product/comment.vue")
      }
    ]
  },
  {
    path: "/order",
    name: "order",
    component: Layout,
    redirect: "/order/index",
    meta: {
      title: "订单",
      icon: "icon-aiguifanfile"
    },
    children: [
      {
        path: "/order/index",
        meta: {
          title: "全部订单",
          group: "订单查询"
        },
        name: "orderAll",
        component: () => import("@/views/order/index.vue")
      },
      {
        path: "/order/mail",
        meta: {
          title: "发货管理",
          group: "订单管理"
        },
        name: "orderMail",
        component: () => import("@/views/order/mail.vue")
      },
      {
        path: "/order/wait",
        meta: {
          title: "自提管理",
          group: "订单管理"
        },
        name: "orderWait",
        component: () => import("@/views/order/wait.vue")
      },
      {
        path: "/order/after",
        meta: {
          title: "售后订单",
          group: "售后管理"
        },
        name: "orderAfter",
        component: () => import("@/views/order/after.vue")
      },
      {
        path: "/order/cancel",
        meta: {
          title: "取消订单",
          group: "历史订单"
        },
        name: "orderCancel",
        component: () => import("@/views/order/cancel.vue")
      },
      {
        path: "/order/pay",
        meta: {
          title: "支付单",
          group: "历史订单"
        },
        name: "orderPay",
        component: () => import("@/views/order/pay.vue")
      }
    ]
  },
  {
    path: "/customer",
    name: "customer",
    component: Layout,
    redirect: "/customer/index",
    meta: {
      title: "客户",
      icon: "icon-kehu"
    },
    children: [
      {
        path: "/customer/index",
        meta: {
          title: "全部客户",
          group: "客户管理"
        },
        name: "customerAll",
        component: () => import("@/views/customer/index.vue")
      },
      {
        path: "/customer/label",
        meta: {
          title: "客户标签",
          group: "客户管理"
        },
        name: "customerLabel",
        component: () => import("@/views/customer/label.vue")
      },
      {
        path: "/customer/setup",
        meta: {
          title: "会员设置",
          group: "权益管理"
        },
        name: "customerSetup",
        component: () => import("@/views/customer/setup.vue")
      },
      {
        path: "/customer/benefit",
        meta: {
          title: "会员权益",
          group: "权益管理"
        },
        name: "customerBenefit",
        component: () => import("@/views/customer/benefit.vue")
      },
      {
        path: "/customer/integral",
        meta: {
          title: "积分管理",
          group: "资产管理"
        },
        name: "customerIntegral",
        component: () => import("@/views/customer/integral.vue")
      }
    ]
  },
  {
    path: "/market",
    name: "market",
    component: Layout,
    redirect: "/market/index",
    meta: {
      title: "营销",
      icon: "icon-yingxiao"
    },
    children: [
      {
        path: "/market/index",
        meta: {
          title: "营销中心",
          group: "营销"
        },
        name: "marketCenter",
        component: () => import("@/views/market/index.vue")
      },
      {
        path: "/market/promote",
        meta: {
          title: "推广中心",
          group: "营销"
        },
        name: "marketPromote",
        component: () => import("@/views/market/promote.vue")
      },
      {
        path: "/market/channel",
        meta: {
          title: "渠道追踪",
          group: "广告推广"
        },
        name: "marketChannel",
        component: () => import("@/views/market/channel.vue")
      },
      {
        path: "/market/application",
        meta: {
          title: "我的应用",
          group: "服务市场"
        },
        name: "marketApplication",
        component: () => import("@/views/market/application.vue")
      },
      {
        path: "/market/order",
        meta: {
          title: "我的订单",
          group: "服务市场"
        },
        name: "marketOrder",
        component: () => import("@/views/market/order.vue")
      }
    ]
  },
  {
    path: "/pay",
    name: "pay",
    component: Layout,
    redirect: "/pay/index",
    meta: {
      title: "支付",
      icon: "icon-zhifu"
    },
    children: [
      {
        path: "/pay/index",
        meta: {
          title: "支付账号",
          group: "支付配置"
        },
        name: "payAccount",
        component: () => import("@/views/pay/index.vue")
      },
      {
        path: "/pay/collection",
        meta: {
          title: "收款配置",
          group: "支付配置"
        },
        name: "payCollection",
        component: () => import("@/views/pay/collection.vue")
      },
      {
        path: "/pay/payment",
        meta: {
          title: "付款配置",
          group: "支付配置"
        },
        name: "payPayment",
        component: () => import("@/views/pay/payment.vue")
      },
      {
        path: "/pay/offline",
        meta: {
          title: "线下收款",
          group: "支付配置"
        },
        name: "payOffline",
        component: () => import("@/views/pay/offline.vue")
      },
      {
        path: "/pay/revenue",
        meta: {
          title: "营收状况",
          group: "财务管理"
        },
        name: "payRevenue",
        component: () => import("@/views/pay/revenue.vue")
      },
      {
        path: "/pay/online",
        meta: {
          title: "线上交易",
          group: "财务管理"
        },
        name: "payOnline",
        component: () => import("@/views/pay/online.vue")
      },
      {
        path: "/pay/refund",
        meta: {
          title: "线上退款",
          group: "财务管理"
        },
        name: "payRefund",
        component: () => import("@/views/pay/refund.vue")
      },
      {
        path: "/pay/withdrawal",
        meta: {
          group: "分账管理",
          title: "提款管理"
        },
        name: "payWithdrawal",
        component: () => import("@/views/pay/withdrawal.vue")
      },
      {
        path: "/pay/logistics",
        meta: {
          title: "三方物流",
          group: "成本核算"
        },
        name: "payLogistics",
        component: () => import("@/views/pay/logistics.vue")
      },
      {
        path: "/pay/integral",
        meta: {
          title: "积分明细",
          group: "成本核算"
        },
        name: "payIntegral",
        component: () => import("@/views/pay/integral.vue")
      },
      {
        path: "/pay/invoice",
        meta: {
          title: "发票管理",
          group: "电子发票"
        },
        name: "payInvoice",
        component: () => import("@/views/pay/invoice.vue")
      }
    ]
  },
  {
    path: "/material",
    name: "material",
    component: Layout,
    redirect: "/material/index",
    meta: {
      title: "数据",
      icon: "icon-ico_data"
    },
    children: [
      {
        path: "/material/index",
        meta: {
          title: "今日概况",
          group: "店铺概况"
        },
        name: "materialToday",
        component: () => import("@/views/material/index.vue")
      },
      {
        path: "/material/realtime",
        meta: {
          title: "实时概况",
          group: "店铺概况"
        },
        name: "materialRealtime",
        component: () => import("@/views/material/realtime.vue")
      },
      {
        path: "/material/monitor",
        meta: {
          title: "客流检测",
          group: "客流分析"
        },
        name: "materialMonitor",
        component: () => import("@/views/material/monitor.vue")
      },
      {
        path: "/material/direction",
        meta: {
          title: "客户流向",
          group: "客流分析"
        },
        name: "materialDirection",
        component: () => import("@/views/material/direction.vue")
      },
      {
        path: "/material/product",
        meta: {
          title: "商品交易",
          group: "交易洞察"
        },
        name: "materialProduct",
        component: () => import("@/views/material/product.vue")
      },
      {
        path: "/material/search",
        meta: {
          title: "搜索偏好",
          group: "交易洞察"
        },
        name: "materialSearch",
        component: () => import("@/views/material/search.vue")
      }
    ]
  },
  {
    path: "/channel",
    name: "channel",
    component: Layout,
    redirect: "/channel/index",
    meta: {
      title: "渠道",
      icon: "icon-qudao"
    },
    children: [
      {
        path: "/channel/index",
        meta: {
          title: "自定义菜单",
          group: "公众号"
        },
        name: "customMenu",
        component: () => import("@/views/channel/index.vue")
      },
      {
        path: "/channel/reply",
        meta: {
          title: "自动回复",
          group: "公众号"
        },
        name: "autoReply",
        component: () => import("@/views/channel/reply.vue")
      },
      {
        path: "/channel/administration",
        meta: {
          title: "公众号管理",
          group: "公众号"
        },
        name: "administration",
        component: () => import("@/views/channel/administration.vue")
      },
      {
        path: "/channel/wechat",
        meta: {
          title: "微信小程序",
          group: "小程序"
        },
        name: "wechatApplet",
        component: () => import("@/views/channel/wechat.vue")
      },
      {
        path: "/channel/web",
        meta: {
          title: "H5设置",
          group: "H5"
        },
        name: "web",
        component: () => import("@/views/channel/web.vue")
      },
      {
        path: "/channel/app",
        meta: {
          title: "APP开店",
          group: "APP"
        },
        name: "app",
        component: () => import("@/views/channel/app.vue")
      }
    ]
  },
  {
    path: "/setup",
    name: "setup",
    component: Layout,
    redirect: "/setup/index",
    meta: {
      title: "设置",
      icon: "icon-shezhi"
    },
    children: [
      {
        path: "/setup/index",
        meta: {
          title: "商户信息",
          group: "店铺信息"
        },
        name: "setupMerchant",
        component: () => import("@/views/setup/index.vue")
      },
      {
        path: "/setup/product",
        meta: {
          title: "商品设置",
          group: "系统设置"
        },
        name: "setupProduct",
        component: () => import("@/views/setup/product.vue")
      },
      {
        path: "/setup/order",
        meta: {
          title: "订单设置",
          group: "系统设置"
        },
        name: "setupOrder",
        component: () => import("@/views/setup/order.vue")
      },
      {
        path: "/setup/delivery",
        meta: {
          title: "配送设置",
          group: "系统设置"
        },
        name: "setupDelivery",
        component: () => import("@/views/setup/delivery.vue")
      },
      {
        path: "/setup/news",
        meta: {
          title: "消息通知",
          group: "系统设置"
        },
        name: "setupNews",
        component: () => import("@/views/setup/news.vue")
      },
      {
        path: "/setup/account",
        meta: {
          title: "账号权限",
          group: "账号权限"
        },
        name: "setupAccount",
        component: () => import("@/views/setup/account.vue")
      },
      {
        path: "/setup/log",
        meta: {
          title: "操作日志",
          group: "账号权限"
        },
        name: "setupLog",
        component: () => import("@/views/setup/log.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
