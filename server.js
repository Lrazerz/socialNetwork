const express = require('express');
const app = express();
const connectDB = require('./config/db');

app.use(express.json());

const PORT = process.env.PORT || 5000;

// connect db
connectDB();

// define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(PORT, () => {
  console.log('server is running on port', PORT);
});