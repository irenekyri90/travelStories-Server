const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  image: {type: String},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  postedStories: [{type: Schema.Types.ObjectId, ref: "Story"}],
  following: [{type: Schema.Types.ObjectId, ref: "User"}],
  followers: [{type: Schema.Types.ObjectId, ref: "User"}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});


const User = mongoose.model('User', userSchema);

module.exports = User;