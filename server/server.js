import { MoviesApi } from "./routes/api/movies.js";
import connectDB from "./config/dbConnect.js";
import express from "express";
import * as path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { LoginApi } from "./routes/api/login.js";
import { WebSocketServer } from "ws";
import Movie from "./models/Movie.js";

dotenv.config();

// Connect to db
await connectDB();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/login", LoginApi());
app.use("/api/movies", MoviesApi());

app.use(express.static("../client/dist"));

const sockets = [];

const wsServer = new WebSocketServer({ noServer: true });
wsServer.on("connect", (socket) => {
  sockets.push(socket);
  // gets data som client
  socket.on("message", async (data) => {
    for (const recipient of sockets) {
      // const allMovies = await Movie.find({}).exec();
      // recipient.send(JSON.stringify({ allMovies }));
    }
  });
});

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
  server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      console.log("Connected");
      wsServer.emit("connection", socket, req);
    });
  });
});

// app.get("/api/config", (req, res) => {
//   res.json({
//     response_type: "token",
//     client_id:
//       "946080345339-uhfncmu533tmardmeiiauepicqe3prlo.apps.googleusercontent.com",
//     discovery_endpoint:
//       "https://accounts.google.com/.well-known/openid-configuration",
//   });
// });
