const mongoose = require('mongoose');
const SkillSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  score: Number,
  evidence: [{ eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }, summary: String, weight: Number }],
  lastUpdated: Date
});
module.exports = mongoose.model('Skill', SkillSchema);
