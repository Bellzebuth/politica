var mongoose = require('mongoose');

var photoFileSchema = mongoose.Schema({
    length: {
        type: Number
    },
    chunkSize: {
        type: Number
    },
    uploadDate: {
        type: Date,
    },
    filename: {
        type: String,
    },
    contentType:{
        type: String,
    },
});

var PhotoFile = module.exports = mongoose.model('photos.files', photoFileSchema);

module.exports.get = function (callback, limit) {
    PhotoFile.find(callback).limit(limit);
}