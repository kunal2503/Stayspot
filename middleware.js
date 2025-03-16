const Listing = require("./modules/listing/listing.js");
const Review = require("./modules/listing/review.js");
const ExpressError = require("./utils/ExpressError.js")
const {listingSchema,reviewSchema} = require("./schema.js");

module.exports.isLoggedIn =(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","Login Before action");
        res.redirect("/login");
    }
    next();
}

//redirect Ulr save in locals and after access it 
module.exports.saveUserRedirectUrl =(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req,res,next)=>{
    let {id} =req.params;
    let listing =await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currentUser._id)){
        req.flash("error","You not owner of this Listing");
        return res.redirect(`/listing/${id}`) ;
    }
    next();
}

//server site validation for create listing
module.exports.validateListing=async(req,res,next)=>{
  let {error} = listingSchema.validate(req.body);
   if(error){
    let errorMessage = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(errorMessage, 400);
   }else{
    next();
   }
}

//server site validation for Review listing
module.exports.validateReview=(req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
     if(error){
      let errorMessage = error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errorMessage);
     }else{
      next();
     }
  }
  

  module.exports.isReviewAuthor = async(req,res,next)=>{
    let {id,reviewId} =req.params;
    let review =await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash("error","You not Author of this Review");
        return res.redirect(`/listing/${id}`) ;
    }
    next();
}