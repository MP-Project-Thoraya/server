const passport = require("passport");
const GoogleStrat = require('passport-google-oauth20');

523116377450-d7vth8f53ihuul8ou06kvvgdrpq0o1qn.apps.googleusercontent.com


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
))