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