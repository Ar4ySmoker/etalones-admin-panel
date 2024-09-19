import mongoose from "mongoose";
require('dotenv').config();

const connection = {};

export const connectToDB = async () => {
  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.DATABASE_URL);
    connection.isConnected = db.connections[0].readyState;
    
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
};
console.log("CONNECT  1", connectToDB)



