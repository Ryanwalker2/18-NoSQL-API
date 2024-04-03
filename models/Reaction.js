const { Schema, model } = require('mongoose');
const User = require('./User');

const reactionSchema = mongoose.Schema({
  reactionId: {type: Schema.Types.ObjectId, default: new ObjectId },
  reactionBody: {type: String, require: true, length: [0-280]},
  username: [User],
  createdAt: {type: Date, default: Date.now}
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;