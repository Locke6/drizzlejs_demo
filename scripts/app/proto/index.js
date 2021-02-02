var _ = require('lodash/collection');
exports.items = {
  main: 'main'
};
exports.store = {
  models: {
    protoList: { autoLoad: 'after', url: '../testList' },
    filter: { data: 'all' }
  },
  callbacks: {
    // 只显示男性
    filterSex: function (payload) {
      if (this.models.filter.data === "男")
        this.models.filter.set('all', true);//显示全部课程
      else
        this.models.filter.set("男", true);//只显示男老师的课程
    },
    // 删除单项
    removeTodo: function (payload) {
      var protoList = this.models.protoList;
      protoList.set(_.reject(protoList.data, { id: payload.id }), true);
    },
    //切换修改
    toEdit: function (payload) {
      var protoList = this.models.protoList;
      _.find(protoList.data, { id: payload.id }).flag = payload.flag;
      if(payload.flag){
        _.find(protoList.data, { id: payload.id }).name = payload.name;
      }
      protoList.changed()
    },
    // 勾选单个
    completeTodo: function(payload) {
      var protoList = this.models.protoList;
      _.find(protoList.data, { id: payload.id }).checked = payload.checked;
      protoList.changed();
    },
    // 勾选全部
    completeAllTodo: function(payload) {
      var protoList = this.models.protoList;
      _.map(protoList.data, function(item) {
          item.checked = payload.checked;
      });
      protoList.changed();
    },
    // 删除已勾选
    removeChecked: function(payload) {
      var protoList = this.models.protoList;
      protoList.set(_.reject(protoList.data, { checked: true }), true);
    },
    // 搜索
    searchTodo: function(payload) {
      var protoList = this.models.protoList;
      var target=_.filter(protoList.data, function(item){
        return item.name.includes(payload.name)
      })
      // console.log(target)
      if(!target.length){
        alert("未找到"+payload.name)
        return 
      }
      protoList.set(target, true);
    },
  }
}