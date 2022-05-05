const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lastName: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    genre: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    politicalParti: {
      type: String
    },
    age: {
      type: Number,
      required: true
    },
    profilPicture: {
      type: String
    },
    debate_liked_id: {
      type: Array,
      required: true
    },
    comment_liked: {
      type: Array,
      required: true
    },
    votedList: {
      type: Array,
      required: true
    },
    journalist: {
      type: Boolean,
      required: true
    },
    image: {
      type: String
    },
    indicator: {
      type: Number,
      required: true
    },
    shareOne: {
      type: Boolean,
      required: true
    },
    shareAll: {
      type: Boolean,
      required: true
    },
    shareApp: {
      type: Boolean,
      required: true
    },
    darkMode: {
      type: Boolean,
      required: true
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;

module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
}