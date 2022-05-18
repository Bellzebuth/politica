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
    source: {
        s1: {
            type: String,
        },
        s2: {
            type: String,
        },
        s3: {
            type: String,
        }
    },
    debate: {
        d1: {
            link: {
                type: String,
            },
            name: {
                type: String,
            }
        },
        d2: {
            link: {
                type: String,
            },
            name: {
                type: String,
            }
        },
        d3: {
            link: {
                type: String,
            },
            name: {
                type: String,
            }
        }
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