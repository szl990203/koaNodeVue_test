// server/controllers/todolist
const todolist = require('../models/todolist.js');
const getTodolist = function* () { // 获取某个用户的所有todolist
  const id = this.params.id; // 获取url里传过来的参数里的id
  const status = this.params.status  //url里面传来的status
  const result = yield todolist.getTodolistById(id, status); // 通过yield “同步”地返回查询结果
  this.body = result // 将请求的结果放到response的body里返回
}
const createTodolist = function* () { // 给某个用户创建一条todolist
  const data = this.request.body; // post请求，数据是在request.body里的
  const result = yield todolist.createTodolist(data);
  this.body = {
    success: true
  }
}
const removeTodolist = function* () {
  const id = this.params.id;
  const user_id = this.params.userId;
  const result = yield todolist.removeTodolist(id, user_id);
  this.body = {
    success: true
  }
}
const updateTodolist = function* () {
  const id = this.params.id;
  const user_id = this.params.userId;
  let status = this.params.status;
  status == '0' ? status = true : status = false; // 状态反转（更新）
  const result = yield todolist.updateTodolist(id, user_id, status);
  this.body = {
    success: true
  }
}

module.exports = {
  api: (router) => {
    router.get('/todolist/:id/:status', getTodolist);
    router.post('/todolist', createTodolist);
    router.delete('/todolist/:userId/:id', removeTodolist);
    router.put('/todolist/:userId/:id/:status', updateTodolist)
  }
}
