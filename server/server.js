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

wss.on("connection", (temp) => {
  const clientId = uuidv4();

  clients.set(clientId, temp);
  console.log("client in map: ", clientId, clients.get(clientId));
  temp.on("error", (err) => console.error(err.message));

  // runs when the server sends a message.
  temp.on("message", (message) => {
    const stringMessage = message.toString();
    console.log(`Received message : ${stringMessage}`);

    clients.forEach((client) => {
      //   Here client is a socket. Basically, the 'temp' thing that we get after connection is our socket. We are storing that socket as value, with a key associated with it, which is the clientId, which actually is a random uuid.
      if (client.readyState === WebSocket.OPEN) {
        client.send(stringMessage);
      }
    });
  });

  temp.on("close", () => {
    clients.delete(clientId);
  });

  console.log("New client connected");
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});
