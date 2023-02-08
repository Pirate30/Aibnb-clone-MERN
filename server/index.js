const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const imgDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

const UserModel = require("./models/User");
const cookieParser = require("cookie-parser");

const mongoURI = process.env.MONGO_URI;
const bcryptSecret = bcrypt.genSaltSync(10);
const jwtSecret = "nkvvhvndvsdjva89fvjafva";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(mongoURI);

app.get("/test", (req, res) => {
  res.json("okok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSecret),
    });
    res.json(user);
  } catch (err) {
    res.status(422).json(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({
      email,
    });
    if (user) {
      const passOk = bcrypt.compareSync(password, user.password);
      if (passOk) {
        jwt.sign(
          { email: user.email, id: user._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(user);
          }
        );
      } else {
        res.status(422).json("found, pass not ok");
      }
    } else {
      res.status(422).json("not found");
    }
  } catch (err) {
    res.status(422).json(err);
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, data) => {
      if (err) throw err;
      const { name, email, _id } = await UserModel.findById(data.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
  // res.json({ token });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const name = "place" + Date.now() + ".jpg";
  await imgDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + name,
  });

  res.json(name);
});

const photoMulter = multer({ dest: "uploads/" });

app.post("/upload", photoMulter.array("photos", 100), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i += 1) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

app.listen(5000);
