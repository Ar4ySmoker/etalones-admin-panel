import mongoose from "mongoose";

const connection = {};

export const connectToDB = async () => {
  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.MONGO);
    console.log("mongo is conected")
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
};





// const MONGO = process.env.MONGO

// if (!MONGO) {
//     throw new Error(
//         'Please define the MONGODB environment variable inside .env.local',
//     )
// }

// let cached = global.mongoose

// if (!cached) {
//     cached = global.mongoose = { conn: null, promise: null }
// }

// async function connectToDB() {
//     if (cached.conn) {
//         return cached.conn
//     }
//     if (!cached.promise) {
//         const opts = {
//             bufferCommands: false,
//         }
//         cached.promise = mongoose.connect(MONGO, opts).then(mongoose => {
//             console.log('Db connected')
//             return mongoose
//         })
//     }
//     try {
//         cached.conn = await cached.promise
//     } catch (e) {
//         cached.promise = null
//         throw e
//     }

//     return cached.conn
// }

// export default connectToDB
