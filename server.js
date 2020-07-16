const express = require('express');
const app = express();
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.use(jsonParser);

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



