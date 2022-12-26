const mongoose = require('mongoose');

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
const connectDB = async () =>
{
    // const conn = await mongoose.connect("mongodb://mongo:27017/bookery",connectionParams);
    const conn = await mongoose.connect("mongodb+srv://roxacore:TYvGlP8aiYyiqfCw@cluster0.gpdnfau.mongodb.net/?retryWrites=true&w=majority",connectionParams);
    console.log('MongoDB connected ');
}

module.exports = connectDB;