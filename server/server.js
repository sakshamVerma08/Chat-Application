import express from "express";
import dotenv from "dotenv";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";
const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("Server is running");
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server: server });

const clients = new Set();
wss.on("connection", (temp) => {
  temp.on("error", (err) => console.error(err.message));

  clients.add(temp);

  temp.on("message", (message) => {
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  temp.on("close", () => {
    clients.delete(temp);
  });

  console.log("New client connected");
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});
