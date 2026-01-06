require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Event = require('../src/models/Event');
const Skill = require('../src/models/Skill');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/realityresume_dev';
mongoose.connect(MONGODB_URI).then(async ()=>{
  console.log('Connected');
  await User.deleteMany({});
  await Event.deleteMany({});
  await Skill.deleteMany({});
  const u = await User.create({name:'Demo User', email:'demo@local', passwordHash:'', settings:{publicResume:true}});
  const events = [
    { userId: u._id, provider:'vscode', type:'file.save', timestamp:new Date(), meta:{file:'src/App.jsx', action:'save', language:'javascript'} },
    { userId: u._id, provider:'github', type:'commit', timestamp:new Date(Date.now()-1000*60*60*24), meta:{file:'src/components/Navbar.jsx', message:'Add navbar', repo:'portfolio'} },
    { userId: u._id, provider:'figma', type:'frame.create', timestamp:new Date(Date.now()-1000*60*60*48), meta:{file:'Figma: Dashboard frame', action:'create', frames:3} },
    { userId: u._id, provider:'leetcode', type:'problem.solved', timestamp:new Date(Date.now()-1000*60*60*72), meta:{problem:'Two Sum', difficulty:'Easy'} }
  ];
  await Event.insertMany(events);
  // create skills
  await Skill.create({userId:u._id, name:'React', score:45, evidence:[{eventId:events[0]._id, summary:'Saved App.jsx', weight:5}], lastUpdated:new Date()});
  await Skill.create({userId:u._id, name:'UI/UX Design', score:30, evidence:[{eventId:events[2]._id, summary:'Created Dashboard frames', weight:8}], lastUpdated:new Date()});
  console.log('Seed complete. Demo user: demo@local');
  process.exit(0);
}).catch(err=>{console.error(err); process.exit(1);});
