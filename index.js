const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const redis = require("redis");
const session = require("express-session");
const cors = require("cors");

let RedisStore = require("connect-redis")(session);

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
  // url: aws.url
});

const app = express();

app.enable("trust proxy");
app.use(cors());

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(express.json());

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    // saveUninitialized: false,
    secret: SESSION_SECRET,
    // resave: false,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 3000000,
    },
  })
);

app.get("/api/v1", (_, res) => {
  console.log("yeah it ran");
  res.send(`<h2>Hi there!${process.env.PORT}!!!</h2>`);
});

fs.readdirSync(path.join(__dirname, "routes")).forEach((file) =>
  app.use("/api/v1", require("./routes/" + file).router)
);

async function start() {
  // "mongodb://root:root@mongo/?authSource=admin"
  try {
    await mongoose.connect(
      `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
    );
    console.log("Connected to db successfully");
    const port = process.env.PORT;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (error) {
    console.log(error);
    setTimeout(start, 5000);
  }
}

start();
