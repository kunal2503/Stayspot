const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const User = require("./user.js");

let listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        url:String,
        filename:String,
    },
    price: {
        type: Number,
        required: true  // ✅ Fixed typo
    },
    location: {
        type: String,
        required: true  // ✅ Fixed typo
    },
    country: {
        type: String,
        required: true  // ✅ Fixed typo
    },
    reviews: [{  // ✅ Fixed "review" → "reviews"
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner :{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

// ✅ Fixing `findOneAndDelete` Middleware
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing && listing.reviews && listing.reviews.length > 0) {
        console.log("Deleting reviews:", listing.reviews);
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
