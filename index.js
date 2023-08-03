const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

app.use(cors());
app.use(bodyParser.json());

require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

const ImageModel = require("./image.model");
const RegistrationModel = require("./registration.model");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: Storage,
});

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

// app.post("/api/db/login", (req, res) => {
//   const { email, password } = req.body;
//   RegistrationModel.findOne(
//     {
//       email: email,
//     },
//     (error, user) => {
//       if (error) {
//         return res.status(500).send("Error in the server");
//       }
//       if (!user) {
//         return res.status(404).send("No user found");
//       }

//       bcrypt.compare(password, user.password, (err, result) => {
//         if (err) {
//           return res.status(500).send({
//             auth: true,
//             error: "Error in the server",
//             token: null,
//           });
//         }
//         if (!result) {
//           return res.status(401).send({
//             auth: false,
//             error: "Incorrect email or password",
//             token: null,
//           });
//         }
//         const token = jwt.sign(
//           {
//             id: user._id,
//           },
//           config.get("secret"),
//           {
//             expiresIn: 86400,
//           }
//         );
//         res.status(200).send({
//           auth: true,
//           token: token,
//         });
//       });
//     }
//   );
// });

// app.post("/api/db/registrations", (req, res) => {
//   const { username, email, password } = req.body;
//   bcrypt.hash(password, 10, (err, hash) => {
//     if (err) {
//       return res.status(500).send("Error in the server");
//     }
//     const registration = new RegistrationModel({
//       username,
//       email,
//       password: hash,
//     });
//     registration.save().then(() => res.send("Registration successful!"));
//   });
// });

// app.post("/api/db/products", upload.single("itemImage"), (req, res, next) => {
//   const products = new ImageModel({
//     itemName: req.body.itemName,
//     itemDesc: req.body.itemDesc,
//     itemQuantity: req.body.itemQuantity,
//     itemPrice: req.body.itemPrice,
//     itemWidth: req.body.itemWidth,
//     itemHeight: req.body.itemHeight,
//     itemLength: req.body.itemLength,
//     itemMaterial: req.body.itemMaterial,
//     itemFinish: req.body.itemFinish,
//     itemProductionDays: req.body.itemProductionDays,
//     itemImage: {
//       data: fs.readFileSync(req.file.path),
//       contentType: req.file.mimetype,
//     },
//   });
//   products.save().then(() => res.send("Successfully uploaded!"));
// });

// app.get("/api/db/login", (req, res) => {
//   RegistrationModel.find().then((details) => {
//     res.json(details);
//   });
// });

// app.get("/api/db/registrations", (req, res) => {
//   const { id } = req.params;
//   RegistrationModel.find(
//     {
//       _id: id,
//     },
//     {
//       username: 1,
//     }
//   ).then((user) => {
//     if (!user) return res.status(404).send("User not found!");
//     res.json(user);
//   });
// });

// app.delete("/api/db/products/:id", (req, res) => {
//   const { id } = req.params;
//   ImageModel.deleteOne(
//     {
//       _id: id,
//     },
//     (error) => {
//       if (error) {
//         return res.status(500).send(error);
//       }
//       res.status(200).send("Product successfully deleted");
//     }
//   );
// });

// app.put("/api/db/update-product/:id", async (req, res) => {
//   const { id } = req.params;
//   const { quantity } = req.body;

//   try {
//     const product = await ImageModel.findById(id);
//     if (!product) {
//       return res.status(404).send({
//         error: "Product not found",
//       });
//     }

//     product.itemQuantity = quantity;

//     const updatedProduct = await product.save();
//     res.status(200).send(updatedProduct);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.put("/api/db/products/:id", async (req, res) => {
//   const { id } = req.params;
//   const {
//     itemName,
//     itemDesc,
//     itemQuantity,
//     itemPrice,
//     itemWidth,
//     itemHeight,
//     itemLength,
//     itemMaterial,
//     itemFinish,
//     itemProductionDays,
//   } = req.body;

//   try {
//     const product = await ImageModel.findById(id);
//     if (!product) {
//       return res.status(404).send({
//         error: "Product not found",
//       });
//     }

//     product.itemName = itemName;
//     product.itemDesc = itemDesc;
//     product.itemQuantity = itemQuantity;
//     product.itemPrice = itemPrice;
//     product.itemWidth = itemWidth;
//     product.itemHeight = itemHeight;
//     product.itemLength = itemLength;
//     product.itemMaterial = itemMaterial;
//     product.itemFinish = itemFinish;
//     product.itemProductionDays = itemProductionDays;

//     const updatedProduct = await product.save();
//     res.status(200).send(updatedProduct);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.get("/api/db/registrations/:id", (req, res) => {
//   const { id } = req.params;
//   RegistrationModel.findOne(
//     {
//       _id: id,
//     },
//     {
//       username: 1,
//     }
//   ).then((user) => {
//     if (!user) return res.status(404).send("User not found!");
//     res.json(user);
//   });
// });

// app.get("/api/db/products/:id", (req, res) => {
//   const { id } = req.params;
//   ImageModel.findOne(
//     {
//       _id: id,
//     },
//     (err, product) => {
//       if (err) return res.status(404).send("Product not found!");
//       res.json(product);
//     }
//   );
// });

// app.get("/api/db/products", (req, res) => {
//   ImageModel.find().then((details) => {
//     res.json(details);
//   });
// });

// app.listen(3001, () => {
//   console.log("Server is running on port 3001");
// });

module.exports = app;