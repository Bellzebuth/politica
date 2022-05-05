const voteController = require('../controllers/vote.controller');


module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.get("/api/vote", voteController.index);
    app.post("/api/vote", voteController.new);
    app.get("/api/vote/:vote_id", voteController.view);
    app.patch("/api/vote", voteController.update);
    app.put("/api/vote/:vote_id", voteController.update);
    app.delete("/api/vote/:vote_id", voteController.delete);
  };