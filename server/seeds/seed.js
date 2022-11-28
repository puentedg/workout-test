const db = require('../config/connection');
const { Food, Workout } = require('../models');
const exerciseData = require('./exerciseData.json');
const foodData = require('./foodData.json');

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

    await Workout.create(exerciseData);
    await Food.create(foodData);

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
