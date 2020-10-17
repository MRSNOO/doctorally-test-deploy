require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const router = require("./api")
const path = require('path');
const PORT = process.env.PORT
const PASS = process.env.PASS

const app = express();

mongoose.connect(
  `mongodb+srv://quang:${PASS}@cluster0.4uhkn.mongodb.net/Doctorally?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("DB connected!");
    } else {
      console.error(err);
    }
  }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const http = require('http').createServer(app);

http.listen(PORT);

