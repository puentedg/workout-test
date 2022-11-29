const { Schema, model } = require('mongoose');

const exerciseSchema = new Schema({
  exercises: [
    {
      exercise_name: String,
      source: String,
      description: String,
    },
  ],
  muscle_group: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const Workout = model('Workout', exerciseSchema);

module.exports = Workout;
