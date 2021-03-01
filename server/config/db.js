// db.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require("sequelize"); // 引入sequelize
// 使用url连接的形式进行连接，注意将root: 后面的XXXX改成自己数据库的密码
const Todolist = new Sequelize("mysql://root:szl990203@localhost/todolist", {
  define: {
    timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
  }
});
module.exports = {
  Todolist // 将Todolist暴露出接口方便Model调用
};
