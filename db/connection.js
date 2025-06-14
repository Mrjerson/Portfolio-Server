const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
});

let dbConnection;

module.exports = {
  connectToServer: async function () {
    try {
      dbConnection = await client.connect();
      console.log("Successfully connected to MongoDB.");
      return dbConnection;
    } catch (err) {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    }
  },
  getDb: function () {
    if (!dbConnection) {
      throw new Error("No database connection. Call connectToServer first.");
    }
    return dbConnection.db();
  },
};
