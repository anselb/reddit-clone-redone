const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Comment = require('./comment')

const PostSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  subreddit: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  comments: [Comment.schema]
})

PostSchema.pre('save', function(next) {
  //Set createdAt and updatedAt times
  const now = new Date()
  this.updatedAt = now
  if (!this.createdAt) {
    this.createdAt = now
  }
  next()
})

module.exports = mongoose.model('Post', PostSchema)
