// Import contact model
const News = require('../models/news.model');
// Handle index actions
exports.index = function (req, res) {
    debugger;
    News.get(function (err, news) {
        if (err) {
            res.json({
                status: "Error",
                message: err,
            });
        } else {
            res.json({
                status: 'success',
                data: news,
            })
        }
    });
};

exports.new = function (req, res) {
    const news = new News();
    news.title = req.body.title;
    news.content = req.body.content;
    news.source = req.body.source;
    news.sourceName = req.body.sourceName;
    news.image = req.body.image;
    news.journalist = req.body.journalist;
    news.dateTime = new Date();
    
    news.save(function (err) {
        if (err){
            res.json(err);
        } else {
            res.json({
                message: 'New news created!',
                data: news
            });
        }
    });
};

exports.view = function (req, res) {
    News.findById(req.params.news_id, function (err, news) {
        if (err)
            res.send(err);
        res.json({
            message: 'news details loading..',
            data: news
        });
    });
};


exports.update = function (req, res) {News.findById(req.params.news_id, function (err, news) {
        if (err) {
            res.send(err);
        }
        news.title = req.body.title ? req.body.title : news.title;
        news.content = req.body.content ? req.body.content : news.content;
        news.source = req.body.source ? req.body.source : news.source;
        news.sourceName = req.body.sourceName ? req.body.sourceName : news.sourceName;
        news.image = req.body.image ? req.body.image : news.image;
        news.journalist = req.body.journalist ? req.body.journalist : news.journalist;
        
        news.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'news Info updated',
                data: news
            });
        });
    });
};

exports.delete = function (req, res) {
    News.remove({
        _id: req.params.news_id
    }, function (err, news) {
        if (err)
            res.send(err);res.json({
            status: "success",
            message: 'news deleted'
        });
    });
};

exports.getUserNews = function(req, res) {
    console.log(req.body.id);
    News.find({
        journalist : {
            id:  req.body.id,
            username: req.body.username
        }
    }, function (err, news) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                status: "success",
                data: news
            });
        }
    });
}