const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  location: {
    latitude: Number,
    longitude: Number
  },
  weather: {
    time: Date,
    forecast: String
  },
  attendance: {
    type: Number,
    min: 1
  }
});

module.exports = mongoose.model('Stop', schema);