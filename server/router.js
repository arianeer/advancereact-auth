const Authenticaton = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = reuire("passport");

//we are using tokens so prevent passport from making a cookie session (this is middleware)
const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function (app) {
  app.get("/", requireAuth, function (req, res) {
    res.send({ hi: "there" });
  });
  app.post("/signin", Authenticaton.signin);
  app.post("/signup", Authentication.signup);
};
