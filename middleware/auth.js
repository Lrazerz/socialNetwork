// check header with x-auth-token
// and next if all ok, 401 if not
const jwt = require('jsonwebtoken');

// middleware for private routes
module.exports = (req,res,next) => {
  try {
    // req.header - alias to req.get
    const derivedToken = req.get('x-auth-token');
    if(!derivedToken) {
      return res.status(401).json({msg: "Token required"})
    }

    jwt.verify()


  }


}