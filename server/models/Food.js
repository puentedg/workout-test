const { Schema, model } = require('mongoose');

const foodSchema = new Schema({
  foods: [
    {
      food_name: String,
      source: String,
    },
  ],
  cuisine_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Food = model('Food', foodSchema);

module.exports = Food;
