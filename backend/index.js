const port = process.env.PORT || 4000 || 4001;
const express = require("express");


const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const product = require("./models/product");
const Subscriber = require("./models/emailSubscribe");
const User = require("./models/user");
const Order = require('./models/order');
const ProductDesign = require("./models/productDesign");
// const Subscriber = require("./models/emailSubscribe")
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
const jwtSecret = process.env.JWT_SECRET;
// payment
app.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  // console.log(products);
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.name,
        images: [product.image],
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "https://boho-fashion-e-commerce.vercel.app/success",
    cancel_url: "https://boho-fashion-e-commerce.vercel.app/fail",
  });
  res.json({ id: session.id });
});

// API Creation
app.get("/", (req, res) => {
  res.send("Express is Running ");
});



// // Image upload
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Endpoint for images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  const baseUrl = process.env.BASE_URL;
  console.log(baseUrl);
  // const imageUrl = `${req.file.filename}`;
  const imageUrl = `${"https://boho-fashion-e-commerce.onrender.com"}/images/${req.file.filename}`;
  

  res.json({
    success: 1,
    image_url: imageUrl,
  });
});
















// Creating a product
app.post("/addproduct", async (req, res) => {
  let products = await product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const newproduct = new product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    price: req.body.price,
  });
  
  await newproduct.save();

  res.json({
    success: true,
    name: req.body.name,
  });
});

// Delete a product
app.post("/removeproduct", async (req, res) => {
  await product.findOneAndDelete({ id: req.body.id });
  
  res.json({
    success: 1,
    name: req.body.name,
  });
});

// getting all product
app.get("/allproduct", async (req, res) => {
  let products = await product.find({});
  // .for frontend
  res.send(products);
});

// add user
app.post("/signup", async (req, res) => {
  // check user has account
  let check = await User.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "Existing user found with same Email address",
    });
  }
  // cart
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: {
      id: user.id,
    },
  };
  // jwt token
  const token = jwt.sign(data, jwtSecret);
  res.json({ success: true, token });
});

//login
app.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, jwtSecret);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errros: "Wrong Email-id" });
  }
});

// new collection
app.get("/newcollection", async (req, res) => {
  let products = await product.find({});
  let newcollection = products.slice(1).slice(-8);
    res.send(newcollection);
});

// popular items
app.get("/popularinwomen", async (req, res) => {
  let products = await product.find({ category: "women" });
  let popular_in_women = products.slice(0, 7);
  res.send(popular_in_women);
});
// middleware to fetch user

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token") || localStorage.getItem("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ errors: "Please authenticate using a valid token" });
  } else {
    try {
      const data = jwt.verify(token, jwtSecret);
      req.user = data.user;
      next();
    } catch (error) {
      return res
        .status(401)
        .send({ errors: "Please authenticate using a valid token" });
    }
  }
};

// cartdata
app.post("/addtocart", fetchUser, async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("ADDED");
});

// remove from cartdata
app.post("/removefromcart", fetchUser, async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Removed");
});

// //get cartdata
app.post("/getcart", fetchUser, async (req, res) => {
 
 let userData = await User.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

// customized product design
app.post("/addProductDesign", async (req, res) => {
  try {
    const {
      tshirtcolor,
      upperText,
      lowerText,
      Designimg,
      textSize,
      textColor,
    } = req.body;

    const newProductDesign = new ProductDesign({
      tshirtcolor,
      upperText,
      lowerText,
      Designimg,
      textSize,
      textColor,
    });

    const savedProductDesign = await newProductDesign.save();

    res.status(201).json(savedProductDesign);
  } catch (err) {
    console.error("Error adding product design:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "email date");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Backend route to fetch subscribers
app.get("/subscribersdata", async (req, res) => {
  try {
    const subscribers = await Subscriber.find({});
    res.json(subscribers);
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    res.status(500).json({ message: "Error fetching subscribers" });
  }
});

app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  try {
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    res
      .status(201)
      .json({ message: "Subscription successful", subscriber: newSubscriber });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Subscription failed" });
  }
});

//save order
app.post('/save-order', async (req, res) => {
  try {
      const { formData, cartItems, totalAmount, userId } = req.body;

    
      const newOrder = new Order({
          ...formData,
          cartItems,
          totalAmount
      });

      await newOrder.save();

    
      if (userId) {
          await User.findByIdAndUpdate(userId, {
              $push: { orders: newOrder._id }
          });
      }

      res.status(201).json({ message: 'Order saved successfully', order: newOrder });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


// Fetch all orders
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find(); 
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});









app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port" + port);
  } else {
    console.log("Error: " + error);
  }
});
