const mongoose = require('mongoose');

const keywordSchema = new mongoose.Schema({
  cid: Number,
  keyword: String
});

keywordSchema.statics.create = function (payload) {
  const keyword = new this(payload);
  
  return keyword.save();
}

module.exports = mongoose.model('Keyword', keywordSchema);
