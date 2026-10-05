const cors = require("cors");
require("dotenv").config();

const express = require("express");
const app = express();
const port = 8080;

const mongoose = require("mongoose");
const engine = require("ejs-mate");
const path = require("path");

const ExpressError = require("./utils/ExpressError.js");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const methodOverride = require("method-override");

const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user.js");

const listingsRouter = require("./Routes/listing.js");
const reviewRouter = require("./Routes/review.js");
const userRouter = require("./Routes/user.js");


// =====================================================
// DATABASE
// =====================================================

const dbUrl = process.env.ATLASDB_URL;


// =====================================================
// EXPRESS CONFIGURATION
// =====================================================

app.engine("ejs", engine);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// =====================================================
// CORS - REACT FRONTEND
// =====================================================

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);


// =====================================================
// DISABLE ETAG
// Prevents 304 responses for React API requests
// =====================================================

app.set("etag", false);


// =====================================================
// MIDDLEWARE
// =====================================================

// Serve static files
app.use(express.static(path.join(__dirname, "/public")));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Parse JSON data from React
app.use(express.json());

// Method override
app.use(methodOverride("_method"));


// =====================================================
// MONGODB CONNECTION
// =====================================================

main()
    .then(() => {
        console.log("Connection successful");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });


async function main() {
    await mongoose.connect(dbUrl);
}


// =====================================================
// MONGO SESSION STORE
// =====================================================

const store = MongoStore.create({
    mongoUrl: dbUrl,

    crypto: {
        secret: process.env.SECRET,
    },

    touchAfter: 24 * 3600,
});


// Session store error
store.on("error", (err) => {
    console.log("ERROR IN MONGO SESSION STORE", err);
});


// =====================================================
// SESSION OPTIONS
// =====================================================

const sessionOptions = {
    store,

    secret: process.env.SECRET,

    resave: false,

    saveUninitialized: true,

    cookie: {
        // 7 days
        maxAge: 7 * 24 * 60 * 60 * 1000,

        httpOnly: true,
    },
};


// =====================================================
// SESSION
// =====================================================

app.use(session(sessionOptions));


// =====================================================
// FLASH
// =====================================================

app.use(flash());


// =====================================================
// PASSPORT
// =====================================================

app.use(passport.initialize());

app.use(passport.session());


// Local Strategy
passport.use(
    new LocalStrategy(User.authenticate())
);


// Serialize User
passport.serializeUser(
    User.serializeUser()
);


// Deserialize User
passport.deserializeUser(
    User.deserializeUser()
);


// =====================================================
// DEMO USER
// =====================================================

app.get("/demouser", async (req, res, next) => {
    try {
        let fakeUser = new User({
            email: "student@gmail.com",
            username: "delta-student",
        });

        let registeredUser = await User.register(
            fakeUser,
            "helloworld"
        );

        res.send(registeredUser);
    } catch (err) {
        next(err);
    }
});


// =====================================================
// FLASH + CURRENT USER
// =====================================================

app.use((req, res, next) => {

    res.locals.success = req.flash("success");

    res.locals.error = req.flash("error");

    res.locals.currentUser = req.user;

    console.log(res.locals.success);

    next();
});


// =====================================================
// ROUTES
// =====================================================

// Listings
app.use("/listings", listingsRouter);


// Reviews
app.use(
    "/listings/:id/reviews",
    reviewRouter
);


// User authentication
app.use("/", userRouter);


// =====================================================
// 404 ERROR
// =====================================================

app.all("*", (req, res, next) => {

    next(
        new ExpressError(
            404,
            "Page Not Found"
        )
    );

});


// =====================================================
// ERROR HANDLING
// =====================================================

app.use((err, req, res, next) => {

    console.log(err);

    let {
        status = 500,
        message = "Something Went Wrong",
    } = err;


    // If request comes from React/API
    if (
        req.headers.accept &&
        req.headers.accept.includes("application/json")
    ) {

        return res.status(status).json({
            success: false,
            error: message,
        });

    }


    // Original EJS error page
    res.status(status).render(
        "error.ejs",
        {
            message,
        }
    );

});


// =====================================================
// START SERVER
// =====================================================

app.listen(port, () => {

    console.log(
        `server is listening to port ${port}`
    );

});