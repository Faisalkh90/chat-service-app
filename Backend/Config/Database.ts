import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb://root:password@localhost:27017/myapp?authSource=admin"
    );
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
