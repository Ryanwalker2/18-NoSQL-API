const router = require('express').Router();
const {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser)

router.route('/:username').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:username/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
