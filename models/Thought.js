const { Schema, model } = require('mongoose');
const User = require('./User');
const Reaction  = require('./Reaction');

const thoughtSchema = new Schema ({
  thoughtText: { type: String, require: true, length: [1-280]},
  createdAt: {type: Date, default: Date.now},
  username: [User],
  reactions: [Reaction],
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;