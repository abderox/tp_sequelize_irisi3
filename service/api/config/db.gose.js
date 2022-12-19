const mongoose = require('mongoose');

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
const connectDB = async () =>
{
    const conn = await mongoose.connect("mongodb://mongo:27017/bookery",connectionParams);
    console.log('MongoDB connected ');
}

module.exports = connectDB;