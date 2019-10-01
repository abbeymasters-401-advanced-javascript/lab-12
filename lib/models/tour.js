const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  activities: {
    type: String
  },
  launchDate: {
    type: Date,
    default: Date.now
  },
  stops: [{
    location: {
      latitude: Number,
      longitude: Number
    },
    weather: {
      time: Date,
      forecast: String
    }
  }]
});

module.exports = mongoose.model('Tour', schema);