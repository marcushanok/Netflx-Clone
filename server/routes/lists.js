const router = require('express').Router()
const List = require('../models/list')
const User = require('../models/user')
const verify = require('../verifyToken')
//create

router.post('/',verify,async(req,res)=>{

  const doc = await User.findById(req.user.id)

  if(doc.isAdmin){
    const newList = new List(req.body);

    try{
        const savedList = await newList.save()  
        res.json(savedList)
    }catch(err){
        res.json(err)
    }
  }
  else{
    res.json('you are not allowed')
  }
})


router.get("/", async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
      if (typeQuery) {
        if (genreQuery) {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery, genre: genreQuery } },
          ]);
        } else {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery } },
          ]);
        }
      } else {
        list = await List.aggregate([{ $sample: { size: 10 } }]);
      }
      res.status(200).json(list);
    } catch (err) {
      res.status(500).json(err);
    }
})

module.exports = router;