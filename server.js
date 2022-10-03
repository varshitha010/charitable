const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");



require("dotenv").config();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.port || 3000;
const uri = process.env.MONGO_URI;

// DB connection
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const checkIfUserExists = (email) => {};

const cardList = [
  {
    title: "Electronics",
    image: "images/gadgets.jpeg",
    description:
      "You can find the best Food packaging products that are out there in the market. They are 100% bio products. The packaging range that you find here you won't find anywhere else. You can even customize it according to your need or if you have any new idea you can talk about it to us.",
  },
  {
    title: "Bag",
    image: "images/bag.jpeg",
    description:
      "These products are made from textile waste which would otherwise end up in landfills. This festive season use colorful up cycled bells for decor that has been handcrafted with a lot of love by our team.",
  },
  {
    title: "Mobile",
    image: "images/mobile.jpeg",
    description:
      "Refurbishing e-waste is older components can take the place of new ones without compromising the quality of newly manufactured electronics. Consumers in love with technology won't notice any difference in quality when they buy a new electronic product manufactured using refurbished e-waste.",
  },
  {
    title: "Stationery",
    image: "images/Stationery.jpeg",
    description:
      "Every individual has opportunities every day to make conscious choices while choosing products. We offers everyday office stationery items like books, visiting cards, A4 printing paper, desktop organizers, calendars, pens, pencils and paper bags all made from recycled paper. We can customize these products to suit your requirements. In addition to this, we help schools to make an impact by shifting to the usage of stationery (notebooks, diaries, pen, pencil) made with recycled material. We firmly believe schools are the right place to make children aware about healthy behavior towards environment and to awaken eco-consciousness. Recycled paper pencils made out of paper, no wood, no polymers",
  },
  {
    title: "Bicycle",
    image: "images/bicycle.jpeg",
    description:
      "These products are made from textile waste which would otherwise end up in landfills. This has been handcrafted with a lot of love by our team.",
  },
  {
    title: "Clothing",
    image: "images/clothes.jpeg",
    description:
      "Perfect to use for themed party favors or other all kinds of parties. It is 100 % recyclable. Any design box will be delivered as per the availability at vendor.",
  },
];

app.post("/api/user/signup", (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body));
  let message = "Successful";
  let status = 200;
  client.connect((err, db) => {
    userCollection = client.db("Users").collection("users_data");
    userCollection.findOne({ email: data.email }, function (err, result) {
      if (err || !result?.email) {
        userCollection.insertOne(data, function (err, result) {
          if (err) {
            message = "Failed to Signup";
          }
        });
      } else {
        message =
          "This Email is already registered wit us. Please try with different Email ID";
      }

      res.status(status).json({ message });
    });
  });
});

app.post("/api/user/donation", (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body));
  let message = "Successful";
  let status = 200;
  client.connect((err, db) => {
    userCollection = client.db("Users").collection("donation_users");
    userCollection.insertOne(data, function (err, result) {
      if (err) {
        message = "Failed to insert data";
      }
      res.status(status).json({ message });
    });
  });
});

app.post("/api/user/login", (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body));
  let message = "Successful";
  let status = 200;
  userCollection = client.db("Users").collection("users_data");
  userCollection.findOne({ email: data.email }, function (err, result) {
    if (err || result === null) {
      message = "User doesn't exist";
    } else if (result?.password !== data.password) {
      message = "Email and password didn't match";
    }
    res.status(status).json({ message });
  });
});

app.get("/api/products", (req, res) => {
  client.connect((err, db) => {
    projectCollection = client.db().collection("products");
    projectCollection.find({}).toArray(function (err, result) {
      if (err) {
        res.status(404).json({ statusCode: 404, data: err, message: "fail" });
      }
      res.status(200).json({ statusCode: 200, data: result, message: "success" });
    });
  });
});

const createCollection = () => {
  client.connect((err, db) => {
    projectCollection = client.db().collection("products");
    if (err) {
      console.log("Filed to connect", err);
    }
    console.log("MongoDB connected");
    //insertData(cardList);
  });
};

const insertData = (data) => {
  client.connect((err, db) => {
    projectCollection = client.db().collection("products");
    projectCollection.insertMany(data, function (err, res) {
      if (err) {
        console.log("Failed to insert ", err);
      }
      console.log("successfully inserted");
    });
  });
};

app.listen(port, () => {
  console.log("App listening to: " + port);
  createCollection();
});
