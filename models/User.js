const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

//Schema to create user model
const userSchema = new Schema(
  {
    username: { type: String, unique: true, require: true, trimmed: true },
    email: { type: String, require: true, unique: true },
    thoughts: [Thought],
    friends: [userSchema]
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;