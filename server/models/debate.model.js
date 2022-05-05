var mongoose = require('mongoose');

var debateSchema = mongoose.Schema({
    user: {
        id: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
        },
        profilPicture: {
            type: String
        }
    },
    interest_score: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    comment: {
        type: Array,
        required: true,
    },
    dateTime: {
        type: Date,
        required: true,
    }
});

var Debate = module.exports = mongoose.model('debate', debateSchema);

module.exports.get = function (callback, limit) {
    Debate.find(callback).limit(limit);
}
