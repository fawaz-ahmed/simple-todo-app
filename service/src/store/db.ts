import mongoose from "mongoose";

let db : mongoose.Connection;
const setupDb = async () => {
  const connectString = process.env.DB_CONNECT_STRING || '';
  db = await mongoose.createConnection(connectString)
}

export { db, setupDb }
