import { WebSocketServer } from "ws";

const currentUsers = new Map();

const server = (httpServer) => {
  const wss = new WebSocketServer({ server: httpServer });

  const broadcast = (message, sender) => {
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        const data = JSON.parse(message);
        if (client !== sender && data.type == "message") {
          client.send(message);
        } else {
          client.send(
            JSON.stringify({
              type: "join",
              users: Array.from(currentUsers),
            })
          );
        }
      }
    });
  };

  wss.on("connection", (ws) => {
    console.log("New client connected");

    ws.on("message", (message) => {
      try {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === "join") {
          currentUsers.set(parsedMessage.email, parsedMessage.position);
          broadcast(JSON.stringify(parsedMessage), ws);
        } else if (parsedMessage.type === "message") {
          currentUsers.set(parsedMessage.email, parsedMessage.position);
          broadcast(JSON.stringify(parsedMessage), ws);
        }

        console.log("Current users:", currentUsers);
      } catch (error) {
        console.error("Failed to parse message:", error.message);
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  console.log("WebSocket server is running");
};

export default server;
