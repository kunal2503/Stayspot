const express = require("express");
const router =express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js")
const {index, createNewListing, showListingInfo, addNewListing,  destroayListing, editListings, updateListing,} = require("../controllers/lisiting.js")
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage})

router.route("/")
.get(wrapAsync(index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(addNewListing))

router.get("/new",isLoggedIn,createNewListing)

router.route("/:id")
.get(wrapAsync(showListingInfo))
.put(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(destroayListing))

//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(editListings))


module.exports=router;