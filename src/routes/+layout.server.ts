import { WebSocketServer } from 'ws';
import crypto from "node:crypto";

const wss = new WebSocketServer({ port: 8082 });
const clients: {
    id: string,
    ws: WebSocket;
}[] = [];

//Update the state across all devices using WS
wss.on("connection", ws => {
    let id = crypto.randomUUID();
    clients.push({ id, ws });

    ws.send(JSON.stringify({ id }));

    ws.on("message", async (data) => {
        let value = JSON.parse(data).value;
        let wsId = JSON.parse(data).id;

        clients.forEach(async (client) => {
            if (client.id !== wsId) {
                client.ws.send(JSON.stringify(`${value}`));
            }
        });
    });

    ws.on("close", () => {
        for (const client of clients) {
            if (client.id === id) {
                clients.splice(client, 1);
            }
        }
    });
});


export const load = async ({ fetch }) => {

    //Give back the state from the database
    let DBStateResponse = (await fetch("/api/price-list/state", { method: "GET" }));

    const reader = DBStateResponse.body?.getReader();
    let state = "";
    let done, value;

    // Read the stream until it's done
    if (reader) {
        while ({ done, value } = await reader.read(), !done) {
            // Assuming value is a Uint8Array, convert it to a string
            state += new TextDecoder().decode(value);
        }
    }

    return {
        state
    };

}



