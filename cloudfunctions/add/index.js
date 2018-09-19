// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (e, context) => {
  return {
    sum: e.a + e.b,
    userInfo: e.userInfo
  }
  // return db.collection("foodball").get()
}