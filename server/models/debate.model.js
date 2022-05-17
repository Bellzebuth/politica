var mongoose = require('mongoose');

var debateSchema = mongoose.Schema({
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
    message: {
        type: String,
        required: true
    },
    comment: {
        type: Array,
        required: true,
    },
    source: {
        s1: {
            type: String,
        },
        s2: {
            type: String,
        },
        s3: {
            type: String,
        },
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
