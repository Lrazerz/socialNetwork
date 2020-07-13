const mongoose = require('mongoose');
const config = require('config');
const mongoDB = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true },
      err => {
        if(err) {
          throw err;
        }
        console.log('connected');
      });

  } catch (e) {
    console.error(e);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;



