const jwt = require("jwt-simple");
const User = require("../models/user");
const config = require("../config");

function tokenForUser(user) {
  const timpestamp = new Date().getTime();
  // sub= subject, userid so that there is one token per user, iat= issued at
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res, next) {
  //user has already had their email and password authenticated. Now just give them a token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "you must provide an email and a password" });
  }
  //check allr ecords to see if user exists
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }
    //if user email exists, return error
    if (existingUser) {
      return res.status(422).send({ error: "email already in use" });
    }
    //if not create and save record
    const user = new User({
      email: email,
      password: password,
    });
    user.save(function (err) {
      if (err) {
        return next(err);
      }
      //respond to request indicating user is created
      res.json({ token: tokenForUser(user) });
    });
  });
};
