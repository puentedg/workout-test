const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const positiveSchema = new Schema({
  positiveText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 150,
    trim: true,
  },
  positiveAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  
});

const Positive = model('Positive', positiveSchema);

module.exports = Positive;
