
const mongoose = require("mongoose");
const MONGO_URL = process.env.Mongo_URL;
async function connectDB() {
  await mongoose.connect(MONGO_URL);
}
async function disconnectDB() {
  await mongoose.disconnect();
}
mongoose.connection.once("open", async () => {
  console.log("MongoDB connection successful");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});

module.exports = { connectDB, disconnectDB };
