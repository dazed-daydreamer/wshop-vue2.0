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

//获取用户中心数据
export async function getPageUser() {
  const res = await instance.get("/api/shop/user");
  return res;
}

//获取列表模版数据
export async function getPagelistStencil() {
  const res = await instance.get("/api/shop/listStencil");
  return res;
}
