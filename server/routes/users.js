const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const verify = require('../verifyToken')

//UDPATE

// router.put('/:id',verify,async (req,res)=>{
//     if(req.user.id === req.params.id || req.user.isAdmin){
//         if(req.body.password){

//         }
//     }
// })

//find by Id

router.get('/find/:id',async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(200).json(info);
      } catch (err) {
        res.status(500).json(err);
      }
});

//Get all users

router.get("/", verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
      try {
        const users = query
          ? await User.find().sort({_id:-1}).limit(5)
          : await User.find();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed to see all users!");
    }
  });

  module.exports = router