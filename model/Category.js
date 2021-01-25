const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  cid: Number,
  categoryName: String
});

categorySchema.statics.create = function (payload) {
  const category = new this(payload);
  
  return category.save();
}

module.exports = mongoose.model('Category', categorySchema);
