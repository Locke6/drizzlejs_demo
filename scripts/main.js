//加载其他要使用的模块
var D = require('drizzlejs'),
    H = require('handlebars/runtime'),
    getFormData = require('get-form-data'), app;

H.registerHelper('module', function(options) { //注册handlebars的helper
    return (this.Self instanceof D.Module) ? options.fn(this) : '';
});

H.registerHelper('view', function(name, options) { ////注册handlebars的helper
    return (this.Self instanceof D.View) && this.Self.name === name ? options.fn(this) : '';
});
require('./app/ext/qr-code');
require('./app/ext/view/dynamic-view');
require('./app/ext/videojs');
//扩展drizzlejs框架Adapter对象的功能
D.adapt({
    getFormData: function(el) {
        return getFormData(el);
    }
});
//创建应用程序实例，因为是单页面应用，所以只需要创建一个
window.app = app = new D.Application({
    container: document.getElementById('content'),//应用的根容器
    urlRoot: 'api', //详情见model url的说明
    routerPrefix: '#/',
    routers: ['', 'todos'] //其它模块定义的router.js文件，['todos']表示会加载todos模块目录下的router.js文件
});

app.start('todos');//通过路由todos默认加载显示todos模块
