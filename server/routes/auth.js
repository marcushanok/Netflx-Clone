const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//register
router.post('/register',async (req,res)=>{
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(req.body.password,saltRounds)

  const newUser = new User({
    username:req.body.username,
    email:req.body.email,
    password:passwordHash
  })
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
})


//LOGIN

router.post('/login',async (req,res)=>{
      const body = req.body
      const user = await User.findOne({email:body.email})
      const passwordCorrect = user === null ? false
      :await bcrypt.compare(body.password,user.password)
      
      if(!(user&&passwordCorrect)){
        return res.status(401).json({
          error:'invalid username or password'
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }

      const token = jwt.sign(userForToken, process.env.SECRET)

      // console.log(user._doc)

      const { password, ...info } = user._doc;

      // console.log(info)

      res.status(200).json({...info, token})
       
      
})


module.exports = router