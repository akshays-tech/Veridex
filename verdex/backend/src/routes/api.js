const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Event = require('../models/Event');
const Skill = require('../models/Skill');

// Generic event ingestion
router.post('/events', auth, async (req,res)=>{
  const payload = req.body;
  payload.userId = req.user._id;
  payload.timestamp = payload.timestamp ? new Date(payload.timestamp) : new Date();
  const ev = await Event.create(payload);
  // Very simple rule: if event.meta contains language or file extension, map to skill
  const skills = [];
  if(ev.meta && ev.meta.file){
    const f = ev.meta.file;
    if(f.endsWith('.jsx')||f.endsWith('.tsx')||f.includes('react')) skills.push('React');
    if(f.endsWith('.css')||f.endsWith('.scss')) skills.push('CSS');
  }
  // Update/create skill docs
  for(const s of [...new Set(skills)]){
    const skl = await Skill.findOneAndUpdate({userId:req.user._id, name:s}, {$inc:{score:5}, $push:{evidence:{eventId:ev._id, summary: ev.meta && ev.meta.action || 'activity', weight:5}}, $set:{lastUpdated:new Date()}}, {upsert:true, new:true});
  }
  res.json({ok:true, event:ev});
});

// Get aggregated skills
router.get('/skills', auth, async (req,res)=>{
  const skills = await Skill.find({userId:req.user._id}).lean();
  res.json({ok:true, skills});
});

// Get events
router.get('/events', auth, async (req,res)=>{
  const evs = await Event.find({userId:req.user._id}).sort({timestamp:-1}).limit(50).lean();
  res.json({ok:true, events:evs});
});

module.exports = router;
