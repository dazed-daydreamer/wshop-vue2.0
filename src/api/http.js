import { instance } from "./Interceptor";

//获取店铺页面列表
export async function getPageList() {
  const res = await instance.get("/api/shop/list");
  return res;
}

//获取店铺页面导航
export async function getPageTabbar() {
  const res = await instance.get("/api/shop/tabbar");
  return res;
}

//获取店铺页面链接
export async function getPageLinke() {
  const res = await instance.get("/api/shop/link");
  return res;
}
