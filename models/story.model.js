const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema( {
  title: {type: String, required: true},
  location: {type: String},
  image: {type: String, required: true},
  description: {type: String, required: true},
  comments: [{type: Schema.Types.ObjectId, ref: "Comments"}],
  likes: [{type: Schema.Types.ObjectId, ref: "User"}],
  writtenBy: {type: Schema.Types.ObjectId,ref:'User'}, 
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Story = mongoose.model('Story', workshopSchema);

module.exports = Story;