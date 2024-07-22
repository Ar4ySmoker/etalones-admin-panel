import mongoose from "mongoose";
require('dotenv').config();

const connection = {};

export const connectToDB = async () => {
  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect("mongodb+srv://12345678:ar4ycool@cluster0.p9tgbuq.mongodb.net/");
    console.log("mongo is conected")
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
};




