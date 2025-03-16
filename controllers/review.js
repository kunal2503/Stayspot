const Review = require("../modules/listing/review.js");
const Listing = require("../modules/listing/listing.js");

module.exports.createNewReview=async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    console.log(req.user);

    listing.reviews.push(newReview._id);
    await newReview.save();
    await listing.save();
    // console.log("Review was saved")
    req.flash("success","Review Created");
    res.redirect(`/listing/${req.params.id}`);
}

module.exports.deleteReview=async(req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted")
    res.redirect(`/listing/${id}`);
}
