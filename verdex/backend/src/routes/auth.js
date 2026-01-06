const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Simple email/password signup for demo (no production validation)
router.post('/signup', async (req,res)=>{
  const {name,email,password} = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({name,email,passwordHash:hash});
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET||'secret', {expiresIn:'7d'});
    res.json({ok:true, token, user:{id:user._id,name:user.name,email:user.email}});
  } catch(err){
    res.status(400).json({ok:false, error: String(err)});
  }
});

router.post('/login', async (req,res)=>{
  const {email,password} = req.body;
  const user = await User.findOne({email});
  if(!user) return res.status(401).json({ok:false, error:'Invalid'});
  const match = await bcrypt.compare(password, user.passwordHash || '');
  if(!match) return res.status(401).json({ok:false, error:'Invalid'});
  const token = jwt.sign({id:user._id}, process.env.JWT_SECRET||'secret', {expiresIn:'7d'});
  res.json({ok:true, token, user:{id:user._id,name:user.name,email:user.email}});
});

module.exports = router;
