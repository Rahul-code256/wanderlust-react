require("dotenv").config();

const Listing = require("../models/listing.js");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({
    accessToken: mapToken
});


// =====================================================
// INDEX - GET /listings
// =====================================================

module.exports.index = async (req, res) => {

    const allListings = await Listing.find({});

    res.json(allListings);
};


// =====================================================
// NEW LISTING FORM
// GET /listings/new
// =====================================================

module.exports.renderform = (req, res) => {

    res.render("listings/new.ejs");

};


// =====================================================
// SHOW LISTING
// GET /listings/:id
// =====================================================

module.exports.showListing = async (req, res) => {

    const { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        })
        .populate("owner");


    if (!listing) {

        req.flash(
            "error",
            "Listing you requested for does not exist"
        );

        return res.redirect("/listings");
    }


    // For React frontend
    res.json(listing);

};


// =====================================================
// CREATE LISTING
// POST /listings
// =====================================================

module.exports.createListing = async (req, res, next) => {

    try {

        // ==========================================
        // CHECK REQUEST DATA
        // ==========================================

        if (!req.body.listing) {

            return res.status(400).json({
                success: false,
                message: "Listing data is missing"
            });

        }


        // ==========================================
        // GEOCODING
        // ==========================================

        const response = await geocodingClient
            .forwardGeocode({
                query: req.body.listing.location,
                limit: 1
            })
            .send();


        // ==========================================
        // CREATE LISTING OBJECT
        // ==========================================

        const newListing = new Listing(
            req.body.listing
        );


        // ==========================================
        // CLOUDINARY IMAGE
        // ==========================================

        if (req.file) {

            const url = req.file.path;

            const filename = req.file.filename;

            newListing.image = {
                url,
                filename
            };

        }


        // ==========================================
        // MAPBOX GEOMETRY
        // ==========================================

        if (
            response.body.features &&
            response.body.features.length > 0
        ) {

            newListing.geometry =
                response.body.features[0].geometry;

        }


        // ==========================================
        // OWNER
        // ==========================================

        newListing.owner = req.user._id;


        // ==========================================
        // SAVE LISTING
        // ==========================================

        const savedListing =
            await newListing.save();


        console.log(
            "New listing created:",
            savedListing._id
        );


        // ==========================================
        // REACT JSON RESPONSE
        // ==========================================

        res.status(201).json({

            success: true,

            message: "New Listing Created",

            listing: savedListing

        });


    } catch (error) {

        console.error(
            "Create listing error:",
            error
        );

        next(error);

    }

};


// =====================================================
// EDIT LISTING FORM
// GET /listings/:id/edit
// =====================================================

module.exports.renderEditform = async (
    req,
    res,
    next
) => {

    try {

        const { id } = req.params;


        // ==========================================
        // FIND LISTING
        // ==========================================

        const listing =
            await Listing.findById(id);


        if (!listing) {

            req.flash(
                "error",
                "Listing you requested for doesn't exist"
            );

            return res.redirect("/listings");

        }


        // ==========================================
        // IMAGE URL
        // ==========================================

        let URL = "";

        if (
            listing.image &&
            listing.image.url
        ) {

            URL =
                listing.image.url.replace(
                    "/upload",
                    "/upload/w_250"
                );

        }


        // ==========================================
        // RENDER OLD EJS FORM
        // ==========================================

        res.render(
            "listings/edit.ejs",
            {
                listing,
                URL
            }
        );


    } catch (error) {

        console.error(
            "Render edit form error:",
            error
        );

        next(error);

    }

};


// =====================================================
// UPDATE LISTING
// PUT /listings/:id
// =====================================================

module.exports.updateListing = async (
    req,
    res,
    next
) => {

    try {

        const { id } = req.params;


        // ==========================================
        // UPDATE BASIC DATA
        // ==========================================

        const listing =
            await Listing.findByIdAndUpdate(
                id,
                {
                    ...req.body.listing
                },
                {
                    new: true,
                    runValidators: true
                }
            );


        if (!listing) {

            return res.status(404).json({

                success: false,

                message: "Listing not found"

            });

        }


        // ==========================================
        // UPDATE IMAGE
        // ==========================================

        if (req.file) {

            const url = req.file.path;

            const filename = req.file.filename;


            listing.image = {

                url,

                filename

            };


            await listing.save();

        }


        console.log(
            "Listing updated:",
            listing._id
        );


        // ==========================================
        // REACT JSON RESPONSE
        // ==========================================

        res.json({

            success: true,

            message: "Listing Updated",

            listing

        });


    } catch (error) {

        console.error(
            "Update listing error:",
            error
        );

        next(error);

    }

};


// =====================================================
// DELETE LISTING
// DELETE /listings/:id
// =====================================================

module.exports.destroyListing = async (
    req,
    res,
    next
) => {

    try {

        const { id } = req.params;


        // ==========================================
        // DELETE
        // ==========================================

        const deletedListing =
            await Listing.findByIdAndDelete(id);


        if (!deletedListing) {

            return res.status(404).json({

                success: false,

                message: "Listing not found"

            });

        }


        console.log(
            "Listing deleted:",
            deletedListing._id
        );


        // ==========================================
        // REACT JSON RESPONSE
        // ==========================================

        res.json({

            success: true,

            message: "Listing Deleted",

            listing: deletedListing

        });


    } catch (error) {

        console.error(
            "Delete listing error:",
            error
        );

        next(error);

    }

};