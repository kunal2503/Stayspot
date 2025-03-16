const mongoose = require("mongoose");
const Data = require("./data.js");
const Listing = require("../modules/listing/listing.js");

const MONGOOSE_URL = "mongodb://127.0.0.1:27017/stayspot";
async function connect() {
  await mongoose.connect(MONGOOSE_URL);
}
connect()
  .then(() => {
    console.log("Connect to DB");
  })
  .catch(() => {
    console.log("Faild to connect to DB");
  });

//Always check the before run the program your program file locations
const initDB = async () => {
  await Listing.deleteMany({});
  Data.data = Data.map((obj) => ({ ...obj, owner: "67d128bd5128405f57bf0282" }));
  await Listing.insertMany(Data.data);
  console.log("Data was initialized");
};
initDB();
