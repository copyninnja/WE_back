import express from 'express';
import UserModel from './userModel';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import xoauth2 from 'xoauth2';
import MD5 from 'blueimp-md5'
import cookie from 'express-session/session/cookie';
const filter = { password: 0, __v: 0 } //查询时过滤出指定的属性

const router = express.Router(); // eslint-disable-line
let transporter = nodemailer.createTransport({
  host: 'smtp.163.com',
  port: 465,
  secure: true, 
  auth: {
      user: "daniel_gongxf@163.com", // 发件人邮箱
      pass: process.env.MailPassword
  }
});

// Get all users
router.get('/', function (req, res) {
  // 先获取userId
  const userId = req.cookies.userId
  if (!userId) {
    console.log("1")
    return res.send({ code: 1, msg: 'please sign in first' })
  }
  UserModel.findOne({ _id: userId }, filter, function (err, user) {
    if (!user) {    

      res.send({ code: 1, msg: 'no user info' })
    } else {  

      res.send({ code: 0, data: user })
    }
  })
})

//find password
router.post('/findPassword',async(req, res, next) => {
  if (req.body.email) {
    
    var mailOptions = {
      from: '"xf gong"<daniel_gongxf@163.com>',
      to: req.body.email, 
      subject: ' | new message !',
      text: "welcome world"
    }
    transporter.sendMail(mailOptions, function(error, response){
      if(error){
          console.log(error);
      }else{
          res.redirect('/');
      }
  });
}
});
// Register OR authenticate a user
router.post('/register', async (req, res, next) => {
    // const rep = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const { username,email, password, type } = req.body
    UserModel.findOne({$or:[{username:username},{email:email}] }, function (err, user) {
        if (user) {
          res.send({ code: 1, msg: 'user already exist' })
        } else {
          
          new UserModel({username, email, type, password: MD5(password) }).save(function (
            err,
            user
          ) {
            res.cookie('userId', user._id, { maxAge: 1000 * 60 * 60 * 24 })
            var data = { username, email, type, _id: user._id.$oid }
            res.send({
              code: 0,
              data
            })
          })
        }
      })
   
  
  
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body
  const user = await UserModel.findByemail(email).catch(next);
  if (!user) return res.send({
    code: 401,
    msg: 'Authentication failed. User not found.'
  });
  if(user.password == MD5(password)){
    res.cookie('userId', user._id, { maxAge: 1000 * 60 * 60 * 24 })
    res.send({ code: 0, data: user })
  }
  else{
    res.send({ code: 1, msg: 'wrong password' })
  }
  
});

// Update a user
router.put('/:id', (req, res, next) => {
  if (req.body._id) delete req.body._id;
  User.update({
      _id: req.params.id,
    }, req.body, {
      upsert: false,
    })
    .then(user => res.json(200, user)).catch(next);
});
router.post('/userlist', function (req, res) {
  const { type } = req.body
  UserModel.find({ type }, filter, function (err, list) {
    if (!list) {
      res.send({ code: 1, msg: '查询用户列表失败' })
    } else {
    }
    res.send({ code: 0, data: list, msg: new Date() })
  })
})
// 更新用户信息的路由
router.post('/update', function (req, res) {
  // 先获取userId
  const userId = req.cookies.userId
  if (!userId) {
    return res.send({ code: 1, msg: '请先登录' })
  }
  // userId存在，根据userId更新用户信息
  // 得到提交的用户信息
  const user = req.body
  console.log('req'+user)
  UserModel.findByIdAndUpdate({ _id: userId }, user, function (err, oldUser) {
    console.log('old'+oldUser)
    if (!oldUser) {
      // 如果老的用户不存在，告诉浏览器删除cookie
      res.clearCookie('userId')
      res.send({ code: 1, msg: 'cookie有误' })
    } else {
      const { _id, type, username } = oldUser
      const data = Object.assign(user, { _id, type, username })
      console.log( _id, type, username )
      res.send({ code: 0, data, msg: new Date() })
    }
  })
})

export default router;