module.exports = {
    routes: {
        show: 'showShow',//showShow对应下面定义的showTodos函数
        dynamic: 'showDynamic',
        proto: 'showProto',
        video: 'showVideo',
    },
    showShow: function() {
         //在名为content的Region中展示show模块
        return this.app.show('content', 'show', { forceRender: true });
    },
    showDynamic: function() {
    	//在名为content的Region中展示dynamic模块
        return this.app.show('content', 'dynamic', { forceRender: true });
    },
    showProto: function() {
    	//在名为content的Region中展示proto模块
        return this.app.show('content', 'proto', { forceRender: false });
    },
    showVideo: function() {
    	//在名为content的Region中展示proto模块
        return this.app.show('content', 'video', { forceRender: true });
    }
};
