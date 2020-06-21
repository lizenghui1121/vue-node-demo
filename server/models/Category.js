const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}
})
schema.virtual('children', {
  localField: '_id',
  foreignField: 'parent',
  justone: true,
  ref: 'Category'
})
schema.virtual('newsList', {
  localField: '_id',
  foreignField: 'categories',
  justone: true,
  ref: 'Article'
})

module.exports = mongoose.model('Category', schema)