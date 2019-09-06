const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  _id: { type: Schema.ObjectId, required: false },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [ this ],
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
})

CommentSchema.pre('save', function(next) {
  //Make sure author and postId are valid ObjectIds
  console.log("PRESAVE")
  if (!this._id) {
    //Test
    let objectId = mongoose.Types.ObjectId
    this._id = new objectId
  }
  this.author = mongoose.Types.ObjectId(this.author)
  this.postId = mongoose.Types.ObjectId(this.postId)
  next()
})

module.exports = mongoose.model('Comment', CommentSchema)
