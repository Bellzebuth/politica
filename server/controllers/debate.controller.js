const Debate = require('../models/debate.model');

exports.index = function (req, res) {
    Debate.get(function (err, debate) {
        if (err) {
            res.json({
                status: "Error",
                message: err,
            });
        } else {
            res.json({
                status: 'success',
                data: debate,
            })
        }
    });
};

exports.new = function (req, res) {
    const debate = new Debate();
    debate.user_id = req.body.user_id ? req.body.user_id : debate.user_id;
    debate.user = req.body.user ? req.body.user : debate.user;
    debate.interest_score = req.body.interest_score;
    debate.politicalParti = req.body.politicalParti;
    debate.message = req.body.message;
    debate.comment = req.body.comment;
    debate.dateTime = new Date();
    
    debate.save(function (err) {
        if (err){
            res.json(err);
        } else {
            res.json({
                message: 'New debate created!',
                data: debate
            });
        }
    });
};

exports.view = function (req, res) {
    Debate.findById(req.params.debate_id, function (err, debate) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                message: 'debate details loading..',
                data: debate
            });
        }
    });
};


exports.update = function (req, res) {Debate.findById(req.params.debate_id, function (err, debate) {
        if (err) {
            res.send(err);
        } else {
            debate.user_id = req.body.user_id ? req.body.user_id : debate.user_id;
            debate.user = req.body.user ? req.body.user : debate.user;
            debate.interest_score = req.body.interest_score;
            debate.politicalParti = req.body.politicalParti;
            debate.message = req.body.message;
            debate.comment = [];
            debate.dateTime = req.body.dateTime;
        
            debate.save(function (err) {
                if (err) {
                    res.json(err);
                } else {
                    res.json({
                        message: 'debate Info updated',
                        data: debate
                    });
                }
            });
        }
    });
};

exports.delete = function (req, res) {
    Debate.remove({
        _id: req.params.debate_id
    }, function (err, debate) {
        if (err)
            res.send(err);res.json({
            status: "success",
            message: 'debate deleted'
        });
    });
};

exports.getUserDebate = function(req, res) {
    Debate.find({
        user_id : req.params.user_id
    }, function (err, debate) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                status: "success",
                data: debate
            });
        }
    });
}