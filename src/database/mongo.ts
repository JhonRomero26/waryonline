import mongoose from "mongoose";

const { NODE_ENV, MONGODB_URI, MONGODB_URI_TEST } = process.env;

const dbURI: string =
  (NODE_ENV === "test" ? MONGODB_URI_TEST : MONGODB_URI) ||
  "mongodb://admin:admin@localhost:27017/warydev";

export function connectMongo() {
  mongoose
    .connect(dbURI, {})
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error");
      console.error(err);
    });
}
