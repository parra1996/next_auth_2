import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error("error al conectar con la datbase");
}

export const connectDB = async () => {
  const { connection } = await mongoose.connect(MONGODB_URI);
  try {
    if (connection.readyState === 1) {
      console.log("database connected");
      return Promise.resolve(true);
    }
  } catch (error) {
    return Promise.reject(false);
  }
};
