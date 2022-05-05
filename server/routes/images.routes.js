const uploadController = require("../controllers/upload.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.post("/api/files/upload", uploadController.uploadFiles);
    app.get("/api/files", uploadController.getListFiles);
    app.get("/api/files/:name", uploadController.download);

  };
