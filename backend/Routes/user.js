const express = require("express");
const router = express.Router();

const passport = require("passport");

const wrapAsync = require("../utils/wrapAsync.js");
const userController = require("../controller/user.js");


// ==========================================
// SIGNUP
// ==========================================

router.route("/signup")

    .get(userController.renderSignupform)

    .post(
        wrapAsync(userController.signUp)
    );


// ==========================================
// LOGIN PAGE
// ==========================================

router.get(
    "/login",
    userController.renderLoginform
);


// ==========================================
// LOGIN
// ==========================================

router.post(
    "/login",

    (req, res, next) => {

        passport.authenticate(
            "local",
            (err, user, info) => {

                if (err) {
                    return next(err);
                }

                if (!user) {

                    return res.status(401).json({
                        success: false,
                        message:
                            info?.message ||
                            "Invalid username or password"
                    });

                }

                req.logIn(user, (err) => {

                    if (err) {
                        return next(err);
                    }

                    next();

                });

            }
        )(req, res, next);

    },

    userController.login
);


// ==========================================
// LOGOUT
// ==========================================

router.get(
    "/logout",
    userController.logout
);


// ==========================================
// CURRENT USER
// ==========================================

router.get(
    "/current-user",
    (req, res) => {

        console.log("Current user request received");
        console.log("User:", req.user);

        if (!req.user) {
            return res.json({
                authenticated: false,
                user: null
            });
        }

        res.json({
            authenticated: true,
            user: {
                id: req.user._id,
                username: req.user.username,
                email: req.user.email
            }
        });
    }
);


module.exports = router;