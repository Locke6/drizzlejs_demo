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
    // 删除项
    removeTodo: function (payload) {
      var protoList = this.models.protoList;
      protoList.set(_.reject(protoList.data, { id: payload.id }), true);
    },
    //切换修改
    toEdit: function (payload) { 
      var protoList = this.models.protoList;
      _.find(protoList.data, { id: payload.id }).flag = payload.flag;
      protoList.changed()
    }
    // 切换显示/修改
    // update2show: function (payload) {
    //   if (this.models.showOrUpdate.data === "show")
    //     this.models.showOrUpdate.set('update', true);//显示input
    //   else
    //     this.models.showOrUpdate.set("show", true);//显示span
    // },
  }
}