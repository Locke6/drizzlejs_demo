exports.type = 'dynamic';
// 这个data获取的是getEntity返回的值，会作为renderOptions传入给要渲染的Module
exports.dataForEntityModule = function (data) {
    // console.log(data)
    return data;
};

exports.getEntity = function (id) {
    return {
        type: 'video',
        url: 'xx.mp4'
    };
};

exports.getEntityModuleName = function (key) {
    // key值为模版里标签的自定义属性data-dynamic-key
    // console.log(key)
    return 'video';//要动态渲染的模块
}
