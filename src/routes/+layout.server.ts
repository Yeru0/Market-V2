import { WebSocketServer } from 'ws';
import crypto from "node:crypto";

//Update the price list state across all devices using WS
const wss8082 = new WebSocketServer({ port: 8082 });
const clients8082: {
    id: string,
    ws: WebSocket;
}[] = [];

wss8082.on("connection", ws => {
    let id = crypto.randomUUID();
    clients8082.push({ id, ws });

    ws.send(JSON.stringify({ id }));

    ws.on("message", async (data) => {
        let value = JSON.parse(data).value;
        let wsId = JSON.parse(data).id;

        clients8082.forEach(async (client) => {
            if (client.id !== wsId) {
                client.ws.send(JSON.stringify(`${value}`));
            }
        });
    });

    ws.on("close", () => {
        for (const client of clients8082) {
            if (client.id === id) {
                clients8082.splice(client, 1);
            }
        }
    });
});



// Update the price list it self across all devices using WS
const wss8083 = new WebSocketServer({ port: 8083 });
const clients8083: {
    id: string,
    ws: WebSocket;
}[] = [];

wss8083.on("connection", ws => {
    let id = crypto.randomUUID();
    clients8083.push({ id, ws });
    console.log("Client connected: ", id);
    

    ws.send(JSON.stringify({ id }));

    ws.on("message", async (data) => {
        

        let value = JSON.parse(`${data}`).products;
        let wsId = JSON.parse(`${data}`).id;

        clients8083.forEach(async (client) => {
            if (client.id !== wsId) {
                console.log(value, ", sent to: ", client.id)
                client.ws.send(JSON.stringify(value));
            }
        });
    });

    ws.on("close", () => {
        for (const client of clients8083) {
            if (client.id === id) {                
                clients8083.splice(client, 1);
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



