//数据库连接

import sqlite3 from 'sqlite3'
import path from 'path'
import { app } from 'electron'
const NODE_ENV = process.env.NODE_ENV

let DB_PATH = path.join(app.getAppPath(), '/data/daydayup.db')

console.log('连接数据库路径：', app.getAppPath())
console.log('连接数据库路径：', DB_PATH)

// 判断是否是正式环境
if (app.isPackaged) {
  // 正式环境
  DB_PATH = path.join(path.dirname(app.getPath('exe')), '/data/daydayup.db')
}

//连接数据库
function connectDatabase() {
  return new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error('连接数据库错误：' + err.message)
    }
    console.log('连接数据库成功')
  })
}
const db = connectDatabase()

//创建数据库,如果用户本地没有数据库的话就创建否则跳过
function createDataTable() {
  //创建用户表
  db.serialize(function () {
    db.run(
      'create table if not exists user (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, email text, phone text);'
    )
  })
  // db.close();
}
exports.connectDatabase = connectDatabase
exports.createDataTable = createDataTable
exports.db = db
