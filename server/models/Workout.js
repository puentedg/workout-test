const { Schema, model } = require('mongoose');

const exerciseSchema = new Schema({
  exercises: [
    {
      exercise_name: String,
      source: String,
    },
  ],
  muscle_group: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const Workout = model('Workout', exerciseSchema);

module.exports = Workout;
