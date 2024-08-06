const { MongoClient, ServerApiVersion } = require('mongodb');

const Mongo_URI = "mongodb+srv://attr-admin:admin-attr@cluster0.jricab7.mongodb.net/?appName=Cluster0"
const uri = process.env.MONGO_URI || Mongo_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let isConnected = false; // track connection state

const connectDb = async () => {
  if (isConnected) {
    console.log('Already connected to MongoDB...');
    return client;
  }

  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    isConnected = true;
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
    return client;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

module.exports = connectDb;