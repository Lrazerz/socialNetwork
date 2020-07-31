// check header with x-auth-token
// and next if all ok, 401 (unauthorized) if not
const jwt = require('jsonwebtoken');
const config = require('config');

// middleware for private routes
module.exports = (req,res,next) => {
  // req.header - alias to req.get
  const derivedToken = req.get('x-auth-token');
  if(!derivedToken) {
    return res.status(401).json({msg: 'No token, authorization denied'});
  }
  // verify token
  try {
    const decodedToken = jwt.verify(derivedToken, config.get('jwtSecret'));
    // ez access from next middleware
    req.user = decodedToken.user;
    next();
  } catch (e) {
    res.status(401).json({msg: "Token isn't valid"});
  }
}