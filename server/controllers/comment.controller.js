const Comment = require('../models/comment.model');

exports.index = function (req, res) {
    Comment.get(function (err, comment) {
        if (err) {
            res.json({
                status: "Error",
                message: err,
            });
        } else {
            res.json({
                status: 'success',
                data: comment,
            })
        }
    });
};

exports.new = function (req, res) {
    const comment = new Comment();
    comment.debate_id = req.body.debate_id ? req.body.debate_id : comment.debate_id;
    comment.user_id = req.body.user_id ? req.body.user_id : comment.user_id;
    comment.user = req.body.user ? req.body.user : comment.user;
    comment.interest_score = req.body.interest_score;
    comment.politicalParti = req.body.politicalParti;
    comment.comment = req.body.comment;
    comment.side = req.body.side;
    comment.dateTime = new Date();
    
    comment.save(function (err) {
        if (err){
            res.json(err);
        } else {
            res.json({
                message: 'New comment created!',
                data: comment
            });
        }
    });
};

exports.view = function (req, res) {
    Comment.findById(req.params.comment_id, function (err, comment) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                message: 'comment details loading..',
                data: comment
            });
        }
    });
};


exports.update = function (req, res) {Comment.findById(req.params.comment_id, function (err, comment) {
        if (err) {
            res.send(err);
        } else {
            comment.debate_id = req.body.debate_id ? req.body.debate_id : comment.debate_id;
            comment.user_id = req.body.user_id ? req.body.user_id : comment.user_id;
            comment.user = req.body.user ? req.body.user : comment.user;
            comment.interest_score = req.body.interest_score ? req.body.interest_score : comment.interest_score;
            comment.comment = req.body.comment ? req.body.comment : comment.comment;
            comment.side = req.body.side ? req.body.side : comment.side;
            comment.politicalParti = req.body.politicalParti;
            comment.dateTime = new Date();
            
            comment.save(function (err) {
                if (err) {
                    res.json(err);
                } else {
                    res.json({
                        message: 'comment Info updated',
                        data: comment
                    });
                }
            });
        }
    });
};

exports.delete = function (req, res) {
    Comment.remove({
        _id: req.params.comment_id
    }, function (err, comment) {
        if (err)
            res.send(err);res.json({
            status: "success",
            message: 'comment deleted'
        });
    });
};

exports.getDebateComment = function(req, res) {
    Comment.find({
        debate_id : req.params.debate_id
    }, function (err, comment) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                status: "success",
                data: comment
            });
        }
    });
}

exports.updateMany = function (req, res) {
    Comment.updateMany({
        user_id: req.params.user_id
    },{
        $set: {
            user: req.body.user
        }
    }, function (err, comment) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                status: "success",
                data: comment
            });
        }
    })
};