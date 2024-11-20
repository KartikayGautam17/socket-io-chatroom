import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
const app = express();
const server = createServer(app);

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true,
};

const io = new Server(server, { cors: corsOptions });

io.on("connection", (Socket) => {
  console.log(Socket.id + " " + "connected");
  Socket.broadcast.emit("user_connect", `${Socket.id} has joined the server`);
  Socket.emit("welcome", "Welcome to the server " + Socket.id);

  Socket.on("message", (data) => {
    console.log(Socket.id + " : " + data);
    Socket.broadcast.emit("message", Socket.id + " : " + data);
    Socket.emit("message", "You : " + data);
  });

  Socket.on("disconnect", () => {
    console.log(Socket.id + " disconnected");
    Socket.disconnect();
  });
});

app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.json({ abcd: "4" });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
