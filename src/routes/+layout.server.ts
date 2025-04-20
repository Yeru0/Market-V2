import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8082 });
const clients = new Set();

wss.on("connection", ws => {
    console.log("Client connected!");
    clients.add(ws);

    ws.send(JSON.stringify({ message: clients.size }));

    ws.on("message", (data) => {
        clients.forEach(async (client) => {
            client.send(JSON.stringify(`${data}`));
        });
    });

    ws.on("close", () => {
        console.log("Client disconnected!");
        clients.delete(ws);
    });
});




