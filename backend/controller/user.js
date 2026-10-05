const User = require("../models/user");


// ==========================================
// SIGNUP PAGE
// ==========================================

module.exports.renderSignupform = (req, res) => {
    res.json({
        message: "Signup endpoint"
    });
};


// ==========================================
// SIGNUP
// ==========================================

module.exports.signUp = async (req, res, next) => {

    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Username, email and password are required"
            });
        }

        const newUser = new User({
            username,
            email
        });

        const registeredUser = await User.register(
            newUser,
            password
        );


        // Automatically login after signup
        req.login(registeredUser, (err) => {

            if (err) {
                return next(err);
            }

            res.status(201).json({
                success: true,
                message: "Welcome to Wanderlust",
                user: {
                    id: registeredUser._id,
                    username: registeredUser.username,
                    email: registeredUser.email
                }
            });

        });

    } catch (err) {

        console.error("Signup error:", err);

        res.status(400).json({
            success: false,
            message: err.message
        });

    }

};


// ==========================================
// LOGIN PAGE
// ==========================================

module.exports.renderLoginform = (req, res) => {

    res.json({
        message: "Login endpoint"
    });

};


// ==========================================
// LOGIN SUCCESS
// ==========================================

module.exports.login = async (req, res) => {

    res.json({
        success: true,
        message: "Welcome back to Wanderlust!",
        user: {
            id: req.user._id,
            username: req.user.username,
            email: req.user.email
        }
    });

};


// ==========================================
// LOGOUT
// ==========================================

module.exports.logout = (req, res, next) => {

    req.logout((err) => {

        if (err) {
            return next(err);
        }

        res.json({
            success: true,
            message: "You are logged out!"
        });

    });

};