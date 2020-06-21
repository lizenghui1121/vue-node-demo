const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  image: { type: String },
  description: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
})

module.exports = mongoose.model('Strategy', schema, 'strategies')