require("dotenv").config();

const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mongoose = require("mongoose");

const dbUrl = process.env.ATLASDB_URL;

async function main() {
    try {
        await mongoose.connect(dbUrl);
        console.log("MongoDB Atlas connected successfully");

        await Listing.deleteMany({});
        console.log("Old listings deleted");

        const listings = initData.data.map((obj) => ({
            ...obj,
            owner: "6637dcf5c1db1fb4954ec0c3",
        }));

        await Listing.insertMany(listings);

        console.log("Data was initialized successfully");
    } catch (error) {
        console.error("Database initialization error:", error);
    } finally {
        await mongoose.connection.close();
        console.log("MongoDB connection closed");
    }
}

main();
