const commentController = require('../controllers/comment.controller');


module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.get("/api/comment", commentController.index);
    app.post("/api/comment", commentController.new);
    app.get("/api/comment/:comment_id", commentController.view);
    app.patch("/api/comment", commentController.update);
    app.put("/api/comment/:comment_id", commentController.update);
    app.delete("/api/comment/:comment_id", commentController.delete);
    app.get("/api/comment/debate/:debate_id", commentController.getDebateComment);
  };