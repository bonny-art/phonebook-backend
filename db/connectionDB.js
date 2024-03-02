import "dotenv/config";
import mongoose from "mongoose";

const { DB_URI } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database connection is successful");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
