const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find({}).populate({ path: 'reaction', select: 'reactionBody' });
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ id: req.params.thoughtid });

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
      const user = await User.findOneAndUpdate(
        { _id: req.body.username },
        { $addToSet: { thoughts: dbThoughtData.thoughtid } },
        { new: true }
      );
        res.status(200).json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Update one user
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate({ id: req.params.thoughtid }, req.body );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      } else {
        return res.status(200).json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //delete one User
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ username: req.params.thoughtid });

      if (!thought) {
        return res.status(404).json({ message: 'No Thought with that ID' });
      }
      if (!thought.reactions) {
        return res.status(200).json({ message: 'Thought deleted.' });
      } else {
      await Reaction.deleteMany({ reactions: { $in: thought.reactions } });
      res.status(200).json({ message: 'Thought and associated Reactions deleted!' })
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async createReaction(req, res) {
    try {
      const reactionData = await Reaction.create(req.body);
      const thought = await Thought.findOneAndUpdate(
        { _id: req.body.username },
        { $addToSet: { reactions: reactionData.reactionId } },
        { new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'Reaction created, but found no user with that ID' });
      }

      res.status(200).json(reactionData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const reaction = await Reaction.findOneAndDelete({ reactionid: req.params.reactionId });

        if (!reaction) {
          return res.status(404).json({ message: 'No Reaction with that ID' });
        }

        res.status(200).json({ message: 'Reaction removed!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
};