const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authHeader = req.headers.token;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
  
      try {
        var user = jwt.verify(token, process.env.SECRET);
        // console.log(user)
      } catch(err) {
        console.log('token error')
      }
      req.user = user
      next();
}
else {
  return res.status(401).json("You are not authenticated!");
  }
}

module.exports = verify;
