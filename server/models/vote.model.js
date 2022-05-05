var mongoose = require('mongoose');

var voteSchema = mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    for_vote: {
        type: Number,
        required: true,
    },
    against_vote: {
        type: Number,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    dateTime: {
        type: Date,
        required: true
    },
    closeDate: {
        type: Date,
        required: true,
    },
});

var Vote = module.exports = mongoose.model('vote', voteSchema);

module.exports.get = function (callback, limit) {
    Vote.find(callback).limit(limit);
}