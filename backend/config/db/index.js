const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🔥 Database connected successfully 🔥");
  } catch (error) {
    console.log("💀 Failed to connect to database 💀");
  }
}
module.exports = { connect };
