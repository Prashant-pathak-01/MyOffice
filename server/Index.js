import express from "express";
import http from "http";
import Routes from "./Routes.js";
import cors from "cors";
import bodyParser from "body-parser";
import webSocket from "./Websocket/socket.js";
const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Routes);

const websocketServer = http.createServer(app);
webSocket(websocketServer);
websocketServer.listen(8000, () => {
  console.log("Connected to backend");
});
