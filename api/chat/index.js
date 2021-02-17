import express from 'express';
import ChatModel from './chatModel';
import UserModel from '../users/userModel'
const router = express.Router(); // eslint-disable-line
const filter = { password: 0, __v: 0 } //查询时过滤出指定的属性

router.get('/', function (req, res) {
    // 获取cookie中的userId
    const userId = req.cookies.userId
    // 查询所有的用户列表
    UserModel.find(function (err, userlist) {
      // 用对象存储所有的user信息，key为user的id，value为用户的名称和头像
      const users = {}
      userlist.forEach(user => {
        users[user._id] = {
          username: user.username,
          header: user.header
        }
      })
      // 查询所有和userId相关的聊天信息
      ChatModel.find(
        { $or: [{ from: userId }, { to: userId }] },
        filter,
        function (err, chatMsgs) {
          if (chatMsgs) {
            res.send({ code: 0, data: { users, chatMsgs } })
          } else {
            res.send({ code: 1, msg: '请求数据有误' })
          }
        }
      )
    })
  })

  router.post('/readmsg', function (req, res) {
    // 得到请求中的from和to
    const from = req.body.from
    const to = req.cookies.userId
    // 去更新数据库中的数据
    /**
     * 参数1、更新条件
     * 参数2、更新为指定的数据对象
     * 参数3、是否一次更新多条，默认只更新一条
     * 参数4、更新完成的回调函数
     */
    ChatModel.update(
      { from, to, read: false },
      { read: true },
      { multi: true },
      function (err, doc) {
        if (doc) {
          res.send({ code: 0, data: doc.nModified }) //更新的数据数量
        } else {
          res.send({ code: 1, msg: '修改数据失败' })
        }
      }
    )
  })

export default router;