import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

// const MovieSchema = new Schema({
//   id: {type: Number,required: true},
//   title: {type:String,required: true}
// });

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true},
  username: { type: String, required: true }, //姓名
  password: { type: String, required: true }, //密码
  type: { type: String, required: true }, // 机构
  header: { type: String }, //头像
  age: { type: Date }, //年龄
  gender:{type: String}, //性别
  sport: { type: Array }, //sport
  money: { type: String }, //薪资
  detail: { type: String }, //个人简介
  story: { type: String }, //故事
  purchase: { type: String }, //物品
  event: { type: String }, //活动
  companyName:{type: String},
  loc :  { type: {type:String}, coordinates: [Number]},
  subscribe:{type:String},//others username
  friend:{type:Array},//friend username
  acceptDistance:{type:Number},
  nearby :[{type: mongoose.Schema.Types.ObjectId, ref: 'Nearby'}]
});
UserSchema.index({loc: '2dsphere'});

UserSchema.statics.findByemail = function (email) {
  return this.findOne({ email: email });
};
UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};
UserSchema.statics.findPassword = function (email) {
  return this.password;
};



// 

export default mongoose.model('User', UserSchema);