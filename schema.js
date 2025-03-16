const Joi = require('joi');

//create listing schema for add new listings
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),       // ✅ Fixed
        description: Joi.string().required(), // ✅ Fixed
        location: Joi.string().required(),    // ✅ Fixed
        country: Joi.string().required(),     // ✅ Fixed
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null),
    }).required()
});


module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        rating:Joi.number().min(1).max(5).required(),
        comment:Joi.string().required().trim(),
    }).required(),
})