const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String },
  description1: { type: String },
  description2: { type: String },
  description3: { type: String },
})

module.exports = mongoose.model('Mingwen', schema)