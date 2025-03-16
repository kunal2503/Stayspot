const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

const { saveUserRedirectUrl } = require("../middleware.js");
const {
  signInRoute,
  addNewUser,
  loginRoute,
  loginAsUser,
  logoutAsUser,
} = require("../controllers/user.js");


router.route("/signup")
.get(signInRoute)
.post(wrapAsync(addNewUser));


router.route("/login")
.get(loginRoute)
.post(
  saveUserRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  loginAsUser
);

//logout
router.get("/logout", logoutAsUser);

module.exports = router;
