const mongoose = require('mongoose');
const config = require('config');
const mongoDB = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      },
      err => {
        if (err) {
          throw err;
        }
        console.log('database connected');
      });

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

module.exports = connectDB;



