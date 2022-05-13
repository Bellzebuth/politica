var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    debate_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    user: {
        username: {
            type: String,
            required: true,
        },
        profilPicture: {
            type: String
        }
    },
    politicalParti: {
        type: String,
        required: true
    },
    interest_score: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    side: {
        type: Boolean,
        required: true
    },
    dateTime: {
        type: Date,
        required: true,
    }
});

var Comment = module.exports = mongoose.model('comment', commentSchema);

module.exports.get = function (callback, limit) {
    Comment.find(callback).limit(limit);
}