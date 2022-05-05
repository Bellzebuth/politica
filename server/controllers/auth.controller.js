const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    genre: req.body.genre,
    email: req.body.email,
    politicalParti: req.body.politicalParti,
    age: req.body.age,
    journalist: false,
    indicator: 5,
    shareOne: req.body.shareOne,
    shareAll: req.body.shareAll,
    shareApp: req.body.shareApp,
    darkMode: req.body.darkMode,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        roles: authorities,
        accessToken: token
      });
    });
};

exports.index = function (req, res) {
  User.get(function (err, user) {
      if (err) {
          res.json({
              status: "Error",
              message: err,
          });
      }
      res.json({
          status: "success",
          message: "user retrieved successfully",
          data: user
      });
  });
};

exports.delete = function (req, res) {
  User.remove({
      _id: req.params.user_id
  }, function (err, user) {
      if (err){
        res.send(err);
      }
      res.json({
        status: "success",
        message: 'user deleted'
      });
  });
};

exports.view = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
      if (err)
          res.send(err);
      res.json({
          message: 'user details loading..',
          data: user
      });
  });
};

exports.update = function (req, res) {User.findById(req.params.user_id, function (err, user) {
  if (err) {
    res.send(err);
  }
  user.username = req.body.username ? req.body.username : user.username;
  user.password = req.body.password ? req.body.password : user.password;
  user.lastName= req.body.lastName ? req.body.lastName : user.lastName;
  user.firstName= req.body.firstName ? req.body.firstName : user.firstName;
  user.genre= req.body.genre ? req.body.genre : user.genre;
  user.email= req.body.email ? req.body.email : user.email;
  user.politicalParti= req.body.politicalParti ? req.body.politicalParti : user.politicalParti;
  user.age= req.body.age ? req.body.age : user.age;
  user.journalist= req.body.journalist ? req.body.journalist : user.journalist;
  user.indicator= req.body.indicator ? req.body.indicator : user.indicator;
  user.shareOne= req.body.shareOne ? req.body.shareOne : user.shareOne;
  user.shareAll= req.body.shareAll ? req.body.shareAll : user.shareAll;
  user.shareApp= req.body.shareApp ? req.body.shareApp : user.shareApp;
  user.darkMode= req.body.darkMode ? req.body.darkMode : user.darkMode;
  user.profilPicture = req.body.profilPicture ? req.body.profilPicture : user.profilPicture;
  user.debate_liked_id = req.body.debate_liked_id ? debate_liked_id : user.debate_liked_id; 
  user.comment_liked = req.body.comment_liked ? comment_liked : user.comment_liked; 
  user.votedList = req.body.votedList ? votedList : user.votedList; 


  user.save(function (err) {
      if (err)
          res.json(err);
      res.json({
          message: 'user Info updated',
          data: user
      });
  });
});
};