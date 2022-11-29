const db = require('../config/connection');
const { Food, Workout, User, Positive } = require('../models');
const exerciseData = require('./exerciseData.json');
const foodData = require('./foodData.json');
const userData = require('./userSeeds.json')
const positiveData = require('./positiveSeeds.json')

// db.once('open', async () => {
//   await Exercise.deleteMany({});

//   const exercises = await Exercise.insertMany(exerciseData);

//   console.log('Exercises seeded!');
//   process.exit(0);
// });

db.once('open', async () => {
  try {
    await Workout.deleteMany();
    await Food.deleteMany({});
    await User.deleteMany({})

    await Workout.create(exerciseData);
    await Food.create(foodData);
    await User.create(userData)

    for (let i = 0; i < positiveData.length; i++) {
      const { _id, positiveAuthor } = await Positive.create(positiveData[i]);
      const user = await User.findOneAndUpdate(
        { username: positiveAuthor },
        {
          $addToSet: {
            positives: _id,
          },
        }
      );
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
