const jwt = require('jsonwebtoken');
const User = require('../models/User');
module.exports = async function(req,res,next){
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({error:'no auth'});
  const token = auth.replace('Bearer ','').trim();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET||'secret');
    req.user = await User.findById(decoded.id);
    next();
  } catch(e){
    res.status(401).json({error:'invalid token'});
  }
};
