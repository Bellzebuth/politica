var mongoose = require('mongoose');

var photoChunkSchema = mongoose.Schema({
    files_id: {
        type: Object,
      },
    n: {
        type: Number,
    },
    data: {
        $binary: {
            base64: {
                type: String,
            },
            subType: {
                type: String,
            },
        }
    }
});

var PhotoChunk = module.exports = mongoose.model('photos.chunks', photoChunkSchema);

module.exports.get = function (callback, limit) {
    PhotoChunk.find(callback).limit(limit);
}