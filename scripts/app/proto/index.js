var _ = require('lodash/collection');
exports.items = {
  main: 'main',
  footer: "footer"
};
exports.store = {
  models: {
    protoList: { url: '../testList?_page=1&_limit=6' },
    filter: { data: 'all' },
    user: { data: {} },
    totalList: { url: '../testList', autoLoad: 'after' }
  },
  callbacks: {
    // 请求列表数据
    getProtoList: function () {
      var { protoList } = this.models
      return this.get(protoList)
    },
    // 只显示男性
    filterSex: function (payload) {
      if (this.models.filter.data === "男")
        this.models.filter.set('all', true);//显示全部课程
      else
        this.models.filter.set("男", true);//只显示男老师的课程
    },
    // 删除单项
    removeUser: function (payload) {
      var { protoList, totalList,user } = this.models;
      var oriUrl = protoList.options.url
      var page=oriUrl.split('?')[1].split('&')[0].split('=')[1]
      user.data.page = page
      protoList.options.url = `../testList/${payload.id}`
      var that = this
      this.del(protoList).then(function () {
        protoList.options.url = oriUrl
        that.get(protoList)
        that.get(totalList)
      })
    },
    //切换修改
    toEdit: function (payload) {
      var { protoList } = this.models;
      _.find(protoList.data, { id: +payload.id }).flag = payload.flag;
      protoList.changed()
      if (payload.flag) {
        _.find(protoList.data, { id: +payload.id }).name = payload.name;
        var params = protoList.data.find(function (_) { return _.id == payload.id })
        var oriUrl = protoList.options.url
        protoList.set(params, false)
        protoList.options.url = `../testList/`
        var that = this
        this.put(protoList).then(function () {
          protoList.options.url = oriUrl
          that.get(protoList)
        })
      }
    },
    // 勾选单个
    completeUser: function (payload) {
      var { protoList } = this.models;
      _.find(protoList.data, { id: payload.id }).checked = payload.checked;
      protoList.changed();
    },
    // 勾选全部
    completeAllUser: function (payload) {
      var { protoList } = this.models;
      _.map(protoList.data, function (item) {
        item.checked = payload.checked;
      });
      protoList.changed();
    },
    // 删除已勾选
    removeChecked: function (payload) {
      var { protoList } = this.models;
      protoList.set(_.reject(protoList.data, { checked: true }), true);
    },
    // 搜索
    searchUser: function (payload) {
      var { protoList } = this.models;
      var target = _.filter(protoList.data, function (item) {
        return item.name.includes(payload.name)
      })
      if (!target.length) {
        alert("未找到" + payload.name)
        return
      }
      protoList.set(target, true);
    },
    // 重置搜索
    resetUser: function (payload) {
      location.reload()
    },
    // 添加用户
    addUser: function (payload) {
      var { user } = this.models;
      user.data.show = 1;
      user.changed()
    }
  }
};
exports.beforeRender = function () {
  this.dispatch('getProtoList')
};
exports.afterClose = function () {
  // var { protoList } = this.models
  console.log(this.models)
}