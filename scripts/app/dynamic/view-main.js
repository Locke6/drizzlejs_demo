exports.type = 'dynamic';
// 这个data获取的是getEntity返回的值，会作为renderOptions传入给要渲染的Module
exports.dataForEntityModule = function (data) {
    // console.log(data)
    return data;
};
exports.bindings = {
    tab: true
}
exports.dataForTemplate = {
    flag: function (data) {
        return data.tab == 1
    }
}
exports.getEntity = function (id) {
    return {
        type: 'video/mp4',
        url: 'http://vjs.zencdn.net/v/oceans.mp4'
    };
};
exports.actions = {
    'click  video-tab': 'tab',
    'click  show-tab': 'tab'
}
// exports.dataForActions = {
//     tab: function (data, e) {
//         data.name = e.target.dataset.name
//         return data
//     }
// }
exports.getEntityModuleName = function (key) {
    // key值为模版里标签的自定义属性data-dynamic-key
    if (key === "video") {
        return 'video';//要动态渲染的模块
    } else {
        return 'show'
    }
}
