const mongoose = require('mongoose');

const connectToMongo = async()=>{
await mongoose.connect(process.env.DATABASE_URL);
   console.log("Successfully Connected to Mongo DB!");
}

module.exports = connectToMongo;