const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //create new user
  async createUser(req, res) {
    try {
      const dbUserdata = await User.create(req.body);
      res.json(dbUserdata);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Update one user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //delete one User
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No User with that ID' });
      }

      await Thought.deleteMany({ _id: { #in: user.thoughts } });
      res.json({ message: 'User and associated thoughts deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId }, {
        _friends: req.params.friendId });

      if (!user) {
        return res.status(404).json({ message: 'No User with that ID' });
      }

      res.json({ message: 'User added to friends list!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId }, {
        _friends: req.params.friendId });

        if (!user) {
          return res.status(404).json({ message: 'No User with that ID' });
        }

        res.json({ message: 'User removed from friends list!' })
    } catch (err) {
      res.status(500).json(err);
    }
  }
}