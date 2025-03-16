const Listing = require("./modules/listing/listing.js");
const Review = require("./modules/listing/review.js");
const ExpressError = require("./utils/ExpressError.js")
const {listingSchema,reviewSchema} = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Login Before action");
        return res.redirect("/login"); // ✅ Added return to stop execution
    }
    next();
};


//redirect Ulr save in locals and after access it 
module.exports.saveUserRedirectUrl =(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    if (!res.locals.currentUser || !listing.owner.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not the owner of this Listing");
        return res.redirect(`/listing/${id}`);
    }
    next();
};


//server site validation for create listing
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errorMessage = error.details.map((el) => el.message).join(",");
        throw new ExpressError(errorMessage, 400);
    }
    next();
};

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errorMessage = error.details.map((el) => el.message).join(",");
        throw new ExpressError(errorMessage, 400);
    }
    next();
};

  

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);

    if (!review) {
        req.flash("error", "Review not found");
        return res.redirect(`/listing/${id}`);
    }

    if (!res.locals.currentUser || !review.author.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not the author of this Review");
        return res.redirect(`/listing/${id}`);
    }
    next();
};
