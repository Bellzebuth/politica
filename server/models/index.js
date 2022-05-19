const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.comments = require("./comment.model");
db.debates = require("./debate.model");
db.news = require("./news.model");
db.votes = require("./vote.model");
db.photosChunks = require("./photos.chunks.model");
db.photosFiles = require("./photos.files.model");

db.ROLES = ["user", "admin"];

module.exports = db;