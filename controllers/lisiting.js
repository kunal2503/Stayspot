const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../modules/listing/listing.js");


module.exports.index = async (req, res) => {
  let listData = await Listing.find({});
  res.render("listings/index.ejs", { listData });
};

module.exports.createNewListing = (req, res) => {
  console.log("....", req.user);
  res.render("listings/new.ejs");
};

module.exports.showListingInfo = async (req, res) => {
  let { id } = req.params;
  let listingInfo = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listingInfo) {
    req.flash("error", "Listing does not exit");
    res.redirect("/listing");
  }
  res.render("listings/show.ejs", { listingInfo });
};

module.exports.addNewListing = async (req, res, next) => {
  let url=req.file.path;
  let filename=req.file.filename;
  // console.log(url+filename);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image={url,filename};
  await newListing.save();
  // implemwnting Flash
  req.flash("success", "New Listing Created");
  res.redirect("/listing");
};

module.exports.editListings=async(req,res)=>{
    let {id} = req.params;
    let editListing = await Listing.findById(id)
    if(!editListing){
        req.flash("error","Listing not exit for update");
        res.redirect("/listing");
    }
    // console.log(editListing)
    res.render("listings/edit.ejs",{editListing});
}

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (req.file) {
    updatedListing.image = { url: req.file.path, filename: req.file.filename };
  }
  await updatedListing.save();
  req.flash('success', 'Listing updated');
  res.redirect(`/listing/${id}`);
};

module.exports.destroayListing=async(req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing)
    req.flash("success","Listing Deleted");
    res.redirect("/listing");
}