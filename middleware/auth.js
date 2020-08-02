// check header with x-auth-token
// and next if all ok, 401 (unauthorized) if not
const jwt = require('jsonwebtoken');
const config = require('config');
const UserModel = require('../models/User');

// middleware for private routes
module.exports = async (req,res,next) => {
  // req.header - alias to req.get
  const derivedToken = req.get('x-auth-token');
  if(!derivedToken) {
    return res.status(401).json({msg: 'No token, authorization denied'});
  }
  // verify token
  try {
    const decodedToken = await jwt.verify(derivedToken, config.get('jwtSecret'));
    // easy access from next middleware
    req.user = decodedToken.user;
    next();
  } catch (e) {
    // update token exp to 7 days if less then 7 days have passed since the exp
    res.status(401).json([{msg: "Token expired"}]);
  }
}