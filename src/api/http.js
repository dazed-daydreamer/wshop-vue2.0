import { instance } from './Interceptor'


//获取店铺页面列表
export async function getPageList() {
    const res = await instance.get('/api/shop/list');
    return res;
}

//获取店铺页面的组件列表
export async function getShopComponentsList() {
    const res = await instance.get('/api/shop/components');
    return res;
}