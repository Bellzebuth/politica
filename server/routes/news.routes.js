const newsController = require('../controllers/news.controller');


module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.get("/api/news", newsController.index);
    app.post("/api/news", newsController.new);
    app.get("/api/news/:news_id", newsController.view);
    app.patch("/api/news", newsController.update);
    app.put("/api/news/:news_id", newsController.update);
    app.delete("/api/news/:news_id", newsController.delete);
    app.post("/api/news/user", newsController.getUserNews);
  };