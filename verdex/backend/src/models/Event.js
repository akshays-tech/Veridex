const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  provider: String,
  type: String,
  timestamp: Date,
  meta: Object
});
module.exports = mongoose.model('Event', EventSchema);
