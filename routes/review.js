const express = require("express");
const router =express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js")
const {isLoggedIn} = require("../middleware.js");
const Review = require("../modules/listing/review.js");
const Listing = require("../modules/listing/listing.js");
const {validateReview,isReviewAuthor} = require("../middleware.js");
const { createNewReview, deleteReview } = require("../controllers/review.js");


//Reviews routes
router.post("/",isLoggedIn,validateReview,wrapAsync(createNewReview));

// delete Review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(deleteReview))


module.exports=router;