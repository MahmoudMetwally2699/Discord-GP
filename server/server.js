const express = require("express");

const http = require("http");

const cors = require("cors");

const mongoose = require("mongoose");

require("dotenv").config();

const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

//Database Connection
const connectDB = require("./db/connection");

//Routes
const authRoutes = require("./routes/authRoutes");
const friendInvitationRoutes = require("./routes/friendInvitationRoutes");

//middleware auth
const auth = require("./middlewares/auth");

//Socket Server
const socketServer = require("./socketServer");

const port = 5000;

const app = express();

<<<<<<< HEAD
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello");
});

=======
>>>>>>> 79e36a427a4ebf3629b4581d2b42cc54aaa1c6b2
app.use(
  cors({
    origin: "https://discord-gp-frontend.vercel.app/",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/friend-invitation", auth, friendInvitationRoutes);

const server = http.createServer(app);
socketServer.registerSocketServer(server);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, () =>
      console.log(`Server is Running on port :${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
