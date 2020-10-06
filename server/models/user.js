const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

//define model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

//on save hook encrypt password
//before saving a modell run this function
userSchema.pre("save", function (next) {
  //accessing user model
  const user = this;

  //generate a salt then run callback
  //a salt is a randomly generated string of characters
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    //hash (encrypt) our password using the salt, then run callback
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      //overwrite plaintext passeword with the encrypted password
      user.password = hash;
      next();
      // This is a test
    });
  });
});

//compares the submitted password with the one stored in DB.
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

//create model class
const ModelClass = mongoose.model("user", userSchemas);

//export model
module.exports = ModelClass;
