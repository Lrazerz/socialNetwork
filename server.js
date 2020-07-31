const express = require('express');
const app = express();
const connectDB = require('./config/db');

app.use(express.json());

const PORT = process.env.PORT || 5000;

// connect db
connectDB();

app.get('/', (req,res) => {
  res.send('Hello');
})

// define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

app.listen(PORT, () => {
  console.log('server running on port', PORT);
});


// deleted bodyParser
// add tokens array to User model +
// add method to User document to hash password and save jwt +

// maybe smth with express-validator

// routes done