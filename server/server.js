const express = require("express");
const cors = require("cors");
const dbConfig = require("./config/db.config");

const app = express();

const corsOptions = {
  origin: "http://localhost:4200"
};


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json({limit: '50mb'}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }, {limit: '50mb'}));
const db = require("./models");
const Role = db.role;
const Debates = db.debates;
const News = db.news;
const Votes = db.votes;
const User = db.user;
const PhotosChunks = db.photosChunks;
const PhotosFiles = db.photosFiles;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/politica-database?readPreference=primary&appname=MongoDB%20Compass&ssl=false`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur le server Politica" });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/debate.routes")(app);
require("./routes/images.routes")(app);
require("./routes/news.routes")(app);
require("./routes/vote.routes")(app);
require("./routes/comment.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
  Debates.estimatedDocumentCount((err, count) => {
    if (!err && count === 0){
      const debates = require('./database/debates.json');
      Debates.insertMany(debates, null, function (error, results) {
        if (error) throw error;
        console.log("Débats initial chargé");    
    });
    }
  })
  News.estimatedDocumentCount((err, count) => {
    if (!err && count === 0){
      const news = require('./database/news.json');
      News.insertMany(news, null, function (error, results) {
        if (error) throw error;
        console.log("News initial chargé");    
    });
    }
  })
  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0){
      new User ({
          username: "admin",
          password: "admin",
          lastName: "admin",
          firstName: "admin",
          genre: "admin",
          email: "root@root.fr",
          politicalParti: "admin",
          age: 100,
          journalist: true,
          indicator: 5,
          shareOne: false,
          shareAll: false,
          shareApp: false,
          darkMode: false,
          roles: {
            name: "admin"
          }
      });
      const users = require('./database/users.json');
      User.insertMany(users, null, function (error, results) {
        if (error) throw error;
        console.log("Users initial chargé");    
    });
    }
  })
  Votes.estimatedDocumentCount((err, count) => {
    if (!err && count === 0){
      const votes = require('./database/votes.json');
      Votes.insertMany(votes, null, function (error, results) {
        if (error) throw error;
        console.log("Votes initial chargé");    
    });
    }
  })
  PhotosChunks.estimatedDocumentCount((err, count) => {
    if (!err && count === 0){
      const photosChunks = require('./database/photos.chunks.json');
      PhotosChunks.insertMany(photosChunks, null, function (error, results) {
        if (error) throw error;
        console.log("photosChunks initial chargé");    
    });
    }
  })
  PhotosFiles.estimatedDocumentCount((err, count) => {
    if (!err && count === 0){
      const photosFiles = require('./database/photos.files.json');
      PhotosFiles.insertMany(photosFiles, null, function (error, results) {
        if (error) throw error;
        console.log("photosFiles initial chargé");    
    });
    }
  })
}


