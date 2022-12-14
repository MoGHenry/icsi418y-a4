require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://44.201.175.30:8000"
};

app.set('view engine', 'ejs');

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");

// console.log(db.url);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((data) => {
    app.get("/", (req, res) => {
      res.render( 'images', {image: data});
    });
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });



require("./routes/routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
