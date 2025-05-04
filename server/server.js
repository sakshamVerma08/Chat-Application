import express from "express";
import dotenv from "dotenv";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";
const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("Server is running");
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server: server });
const clients = new Map();
const messages = [];

// clients = {1: "2346u62zs", 2: "24367xyz7234pq"}

wss.on("connection", (temp) => {
  const clientId = uuidv4();
  temp.clientId = clientId;
  clients.set(clientId, temp);

  temp.on("error", (err) => console.error(err.message));

  // runs when the server sends a message.
  temp.on("message", (message) => {
    console.log("Message received from the client !");
    const stringMessage = message.toString();

    clients.forEach((client, id) => {
      // Only send to other clients, not the sender
      if (client.readyState === WebSocket.OPEN) {
        client.send(stringMessage);
      }
    });
  });

  temp.on("close", () => {
    clients.delete(clientId);
  });

  console.log(`New client connected with ID: ${clientId}`);
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});
