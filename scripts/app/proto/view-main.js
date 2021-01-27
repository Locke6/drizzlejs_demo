var _ = require('lodash/collection');//加载用到的工具模块
exports.bindings = {
  protoList: true,
  filter: true
};
exports.events = {
  'click edit-*': 'showEdit'
};
exports.handlers = {
  showEdit: function (id) {
    this.$('input-' + id).focus();
  }
}
exports.dataForTemplate = {
  listData: function (data) {
    if (data.filter === 'all') {
      return data.protoList
    }
    return _.filter(data.protoList, { sex: data.filter })
  },
  showMan: function (data) {
    return data.filter === "男"
  },
  // showUpdate: function (data) { 
  //   return data.
  // }
};
exports.actions = {
  'change sexcheck': 'filterSex',
  'click  destroy-*': 'removeTodo',
  'click  edit-*': 'toEdit'
};
exports.dataForActions = {
  toEdit: function (data) {
    data.flag = false
    return data
  }
}
