const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema ({
  reactionId: {type: Schema.Types.ObjectId, default: () => new Types.ObjectId()},
  reactionBody: {type: String, minLength: 1, maxLength: 280},
  username: {type: Schema.Types.ObjectId, ref: 'User'},
  createdAt: {type: Date, default: Date.now}
});

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;