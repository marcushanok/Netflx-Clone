const router = require("express").Router();
const Movie = require("../models/Movie");
const User = require('../models/user')
const verify = require("../verifyToken");
const jwt = require("jsonwebtoken");
//CREATE

router.post("/",verify,async (req, res) => {
       
      const doc = await User.findById(req.user.id) 
      if(doc.isAdmin){
        const newMovie = new Movie(req.body)
        try {
          const savedMovie = await newMovie.save();
          res.status(201).json(savedMovie)
        } catch (error) {
          console.log(error)
        }
      }
      else{
        res.send('you are not allowed')
      }
});

//find movies

router.get("/find/:id", verify, async (req, res) => {
  const {id} = req.params
  
  try {
    const movie = await Movie.findById(id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//random movies

router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router