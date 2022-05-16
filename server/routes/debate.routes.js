const debateController = require('../controllers/debate.controller');


module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.get("/api/debate", debateController.index);
    app.post("/api/debate", debateController.new);
    app.get("/api/debate/:debate_id", debateController.view);
    app.patch("/api/debate", debateController.update);
    app.put("/api/debate/:debate_id", debateController.update);
    app.delete("/api/debate/:debate_id", debateController.delete);
    app.get("/api/debate/user/:user_id", debateController.getUserDebate);
    app.put("/api/debateupdate/:user_id", debateController.updateMany);
  };