const connection = require('../config/connection');
const User = require('../models/User');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

const { getRandomName, getRandomDomain, getRandomThoughts , getReactions} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let thoughtCheck = await connection.db.listCollections({ name: 'Thought' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('Thought');
  }
  
  let userCheck = await connection.db.listCollections({ name: 'Users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('Users');
  }

  let reactionCheck = await connection.db.listCollections({ name: 'Reaction' }).toArray();
  if (reactionCheck.length) {
    await connection.dropCollection('Reaction');
  }

  const users = [];
  const thought = getRandomThoughts(10);
  const reaction = getReactions(5);

  for (let i = 0; i < 20; i++) {
    const username = getRandomName();
    const email = username + getRandomDomain();

    users.push({
      username,
      email,
      thoughts: Math.floor(Math.random() * (99 - 18 + 1) + 18),
    });
  }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thought);
  await Reaction.collection.insertMany(reaction);

  // loop through the saved applications, for each application we need to generate a application response and insert the application responses
  console.table(users);
  console.table(thought);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
