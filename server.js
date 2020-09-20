const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

//Bodyparser Middleware
app.use(bodyparser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to Mongoose
mongoose
.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("MongooseDb Connected..."))
.catch(err => console.log(err));

//Use routes
app.use('/api/items', items);

//Serve static assets if we are in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server started on:" + port));
