var mongoose = require('mongoose');

var newsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    source: {
        type: String,
    },
    image: {
        type: String
    },
    journalist: {
        id: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
    },
    dateTime: Date,
});

var News = module.exports = mongoose.model('news', newsSchema);

module.exports.get = function (callback, limit) {
    News.find(callback).limit(limit);
}