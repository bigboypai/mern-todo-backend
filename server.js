const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const routes = require('./routes/api');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
// Connect to the database


mongoose
  .connect('mongodb+srv://paaai:5iPc5VNPGfXxwxF6@cluster0.xfch9m1.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

  mongoose.Promise = global.Promise;
    app.options('*', cors())
    app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
app.use('/api', routes);
app.use((err, req, res, next) => {
  console.log(err);
  next();
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});