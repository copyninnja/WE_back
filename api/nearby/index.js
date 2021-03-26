
import express from 'express';
import NearbyModel from './NearbyModel';
import User from '../users/userModel';
const filter = { password: 0, __v: 0 } //查询时过滤出指定的属性


const router = express.Router(); // eslint-disable-line



router.post('/', async  (req, res,next)=> {
    const { username,location,sport,introduction,img} = req.body.props
    console.log(location)
    
    try{
      const user = await User.findByUserName(username).catch(next);
        // const user = await User.findByUsername(username);
        const near = await NearbyModel.create({
          "username": username,
          "type": user.type,
          "header": user.header,
          "content":introduction,
          "tag":sport,
          "Img":img,
          "loc":{ type: "Point", coordinates: location},
          "locationArray":location,
          "time": new Date().getTime()
        });
        await user.nearby.push(near._id);
        await user.save();
      
        res.send({ code: 0})
      }catch(next){
      console.error(next)}
  })

  router.post('/story', async  (req, res,next)=> {
    const { username,location} = req.body.props
    console.log(username,location)
    try{
      const user = await User.findByUserName(username).catch(next);
        const nearby=NearbyModel.find({
          loc:
            { $near:
               {
                 $geometry: { type: "Point",  coordinates: location },
                 $maxDistance: user.acceptDistance*1000
               }
            }
        },function(err,nearbyList) {
          console.log(nearbyList)

          const nears = {}
          nearbyList.forEach(near => {
            nears[near._id] = {
              username: near.username,
              type: near.type, 
              content:near.content,
              Img:near.Img,
              time:near.time,
              tag:near.tag,
              header:near.header,
              location:near.locationArray
            }
          })
          res.send({ code: 0, data: nears })

        })
// console.log(nearby)
      
        // res.send({ code: 0})
      }catch(next){
      console.error(next)}
  })

  export default router;