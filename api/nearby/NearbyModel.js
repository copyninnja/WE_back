import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// const MovieSchema = new Schema({
//   id: {type: Number,required: true},
//   title: {type:String,required: true}
// });

const NearbySchema = new Schema({
  username: { type: String, required: true }, //姓名
  type: { type: String, required: true }, // 机构
  header: { type: String }, //头像
  content:{type:String},//内容
  Img:{type:Array},//配图
  loc :  { type: {type:String}, coordinates: [Number]},
  time:{type:Number},
  locationArray:{type:Array},
  tag:{type:Array}
});
NearbySchema.index({loc: '2dsphere'});
NearbySchema.statics.findId = function (username,location,time) {
    return this.findOne({ username: username,location:location,time:time });
  };

export default mongoose.model('Nearby', NearbySchema);