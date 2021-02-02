var D = require('drizzlejs');
var _ = require('lodash/collection');
/* 弹出组件 */
function Pop(options = {}, view) {
  var opt = {
    name: '',
    age: '',
    sex: '',
    id: '',
    flag: true,
    checked: false
  }
  var userBox = document.createElement('div')
  var flag = options.show ? options.show : 0
  if (flag) {
    userBox.className = "userbox show-box"
  } else {
    userBox.className = "userbox hide-box"
  }
  var titleArea = document.createElement('div')
  titleArea.className = "title-area"
  var userTitle = document.createElement('span')
  var closeBox = document.createElement('span')
  userTitle.innerText = "新增用户"
  userTitle.className = "user-title"
  closeBox.innerText = "X"
  closeBox.className = "user-close"
  titleArea.appendChild(userTitle)
  titleArea.appendChild(closeBox)
  var contentArea = document.createElement('div');
  var content = `<ul class="user-list">
                <li class="info-row"><span>姓名：</span><input type="text" id="user-name" autocomplete='off'></li>
                <li class="info-row"><span>年龄：</span><input type="text" id="user-age" autocomplete='off'></li>
                <li class="info-row"><label for="user-sex">性别:</label><select id="user-sex" >
                  <option>男</option>
                  <option>女</option>
                </select></li>
              </ul>`
  contentArea.innerHTML = content
  contentArea.className = "user-content"
  var submit = document.createElement('button')
  submit.innerText = "添加"
  contentArea.appendChild(submit)
  userBox.appendChild(titleArea)
  userBox.appendChild(contentArea)
  submit.addEventListener('click', function () {
    var user = view.bindings.protoList,
        name = document.getElementById('user-name'),
        age = document.getElementById('user-age'),
        sex = document.getElementById('user-sex')
    opt.id = Date.now()
    opt.name = name.value
    opt.age = age.value
    opt.sex = sex.value
    var params = opt
    user.set(params, false)
    D.Request.post(user).then(function () {
      D.Request.get(user)
    }).then(function () {
      location.reload()
    })
    userBox.className = "userbox hide-box"
    options.show = 0
  })
  closeBox.addEventListener('click', function () {
    userBox.className = "userbox hide-box"
    options.show = 0
  })
  return userBox
}

/* 组件注册 */
D.ComponentManager.register('pop', function (view, el, options = {}) {
  var { data } = view.bindings[options.model];
  el.appendChild(Pop(data, view));
  return
});
