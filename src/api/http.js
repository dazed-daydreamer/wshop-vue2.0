import { instance } from './Interceptor'


//获取店铺页面列表
export async function getPageList() {
    const res = await instance.get('/api/shop/list');
    return res;
}