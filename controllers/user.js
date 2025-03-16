const User = require("../modules/listing/user.js");

module.exports.signInRoute = (req, res) => {
  res.render("user/signup.ejs");
};

module.exports.addNewUser = async (req, res) => {
  try {
    let { email, username, password } = req.body;
    let newUser = new User({ email, username });
    // console.log(newuUser);
    const registerUser = await User.register(newUser, password);
    req.login(registerUser, (error) => {
      if (error) {
        return next(error);
      }
      req.flash("success", "Welcome to Stayspot");
      res.redirect("/listing");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

module.exports.loginRoute = (req, res) => {
  res.render("user/login.ejs");
};

module.exports.loginAsUser = async (req, res) => {
  req.flash("success", "Welcome back Stayspot");
  let redirectUrl = res.locals.redirectUrl || "/listing"; //for in case empty
  res.redirect(redirectUrl);
};

module.exports.logoutAsUser = (req, res) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    } else {
      req.flash("success", "Successfully Logout");
      res.redirect("/listing");
    }
  });
};
