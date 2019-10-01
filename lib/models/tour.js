const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  activities: [{
    type: String
  }],
  launchDate: {
    type: Date,
    default: Date.now
  },
  stops: [{
    type: ObjectId,
    ref: 'Stop'
  }]
});

module.exports = mongoose.model('Tour', schema);