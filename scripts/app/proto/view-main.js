var _ = require('lodash/collection');//加载用到的工具模块
exports.bindings = {
  protoList: true,
  filter: true,
  user: true,
  totalList: true
};
exports.events = {
  'dblclick edit-*': 'showEdit',
};
exports.handlers = {
  showEdit: function (id) {
    var me = this
    showInput = setTimeout(function () {
      me.$('input-' + id).focus();
    }, 50)
  }
};
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
  completed: function (data) {
    if (!data.protoList.length) {
      return false
    }
    return _.every(data.protoList, ['checked', true]);
  },
  completedNum: function (data) {
    return _.filter(data.protoList, { checked: true }).length
  },
  totalNum: function (data) {
    return data.protoList.length
  }
};
exports.actions = {
  'change sexcheck': 'filterSex',
  'click  destroy-*': 'removeUser',
  'dblclick  edit-*': 'toEdit',
  'blur  input-*': 'toEdit',
  'change toggle-*': 'completeUser',
  'change toggleAll': 'completeAllUser',
  'keypress new-task': 'searchUser',
  'click click2new': 'searchUser',
  'click reset': 'resetUser',
  'click add': 'addUser',
  'click delAll': 'removeChecked',
};
exports.dataForActions = {
  toEdit: function (data, e) {
    if (e.target.dataset.type === "span") {
      data.flag = false
    } else {
      data.flag = true
      data.name = e.target.value
    }
    return data
  },
  completeUser: function (data, e) {
    data.checked = e.target.checked;
    return data;
  },
  completeAllUser: function (data, e) {
    data.checked = e.target.checked;
    return data;
  },
  searchUser: function (data, e) {
    var name
    if (e.target.dataset.name === "button") {
      name = this.$('new-task').value
    } else {
      if (e.keyCode !== 13) {
        return false;
      }
      e.preventDefault();
      name = e.target.value;
    }
    if (!name) {
      alert('内容不能为空')
      return
    }
    data.name = name;
    this.$('new-task').value = '';
    return data;
  },
};
exports.components = [{
  id: 'pop-box',  //templates.hbs里定义的元素
  name: 'pop', //ext目录下的组件名
  options: { model: 'user' }
}]


