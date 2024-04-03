const { Thought, Reaction } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.userId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //create new user
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Update one user
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate({ _id: req.params.userId }, req.body );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //delete one User
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.userId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json({ message: 'Thought successfully deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a friend
  async createReaction(req, res) {
    try {
      const reaction = await Reaction.create(req.body);

      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const reaction = await Reaction.findOneAndDelete({ _reactionid: req.params.reactionId });

        if (!reaction) {
          return res.status(404).json({ message: 'No Reaction with that ID' });
        }

        res.json({ message: 'Reaction removed!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
};