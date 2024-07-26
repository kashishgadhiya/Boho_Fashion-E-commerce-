const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv").config();


const product = require("./models/product");
const Subscriber = require("./models/emailSubscribe");
const User = require("./models/user");
const orderModel = require("./models/order")
const ProductDesign = require("./models/productDesign")
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY)

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
app.post("/create-checkout-session",async(req,res)=>{
        const {products} = req.body
        console.log(products)
        const lineItems=products.map((product)=>({
          price_data:{
            currency:"inr",
            product_data:{
              name:product.name,
              images:[product.image]
            },
            unit_amount:product.price*100,


          },
          quantity:product.quantity,
        }))
        const session = await stripe.checkout.sessions.create({
          payment_method_types:["card"],
          line_items:lineItems,
          mode:"payment",
          success_url:"http://localhost:3000/success",
          cancel_url:"http://localhost:3000/fail",

        
        
        })
        res.json({id:session.id})
})

// API Creation
app.get("/", (req, res) => {
  res.send("Express is Running ");
});

// Image upload
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

// Endpoint for images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    // image_url: `https://e-commerce-website-h0yp.onrender.com/images/${req.file.filename}`,
    image_url: `https://e-commerce-backend-2-bxa8.onrender.com/images/${req.file.filename}`,
    // image_url: `http://localhost:4000/images/${req.file.filename}`,
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
  // console.log(newproduct);
  await newproduct.save();
  // console.log("save");
  res.json({
    success: true,
    name: req.body.name,
  });
});


// Delete a product
app.post("/removeproduct", async (req, res) => {
  await product.findOneAndDelete({ id: req.body.id });
  // console.log("remove");
  // For frontend
  res.json({
    success: 1,
    name: req.body.name,
  });
});
 // getting all product
app.get("/allproduct", async (req, res) => {
  let products = await product.find({});
  // console.log("All products")
  // .for frontend
  res.send(products);
});


// add user
app.post("/signup", async (req, res) => {
  // check user has account
  let check = await User.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({
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
  // console.log("new items")
  res.send(newcollection);
});

// popular items
app.get("/popularinwomen", async (req, res) => {
  let products = await product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  // console.log("popularinwomen")
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
  // console.log("added",req.body.itemId)
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
  // console.log("removed",req.body.itemId)
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
  // console.log("getcart")
  let userData = await User.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

// customized product design
app.post('/addProductDesign', async (req, res) => {
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
      textColor
      
    });

    const savedProductDesign = await newProductDesign.save();

    res.status(201).json(savedProductDesign);
  } catch (err) {
    console.error('Error adding product design:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  try {
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    res.status(201).json({ message: 'Subscription successful', subscriber: newSubscriber });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Subscription failed' });
  }
});


app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port" + port);
  } else {
    console.log("Error: " + error);
  }
});
