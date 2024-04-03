const router = require('express').Router();
const { getThoughts,
   createThought, 
   getSingleThought, 
   updateThought, 
   deleteThought, 
   createReaction, 
   deleteReaction } = require('../../controllers/thoughtController.js');

router.route('/thoughts').get(getThoughts).post(createThought);

router.route('/thoughts/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/thoughts/:thoughtId/reactions').post(createReaction)

router.route('/thought/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;