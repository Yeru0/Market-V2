import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8082 });
const clients = new Set();

//Update the state across all devices using WS
wss.on("connection", ws => {
    clients.add(ws);

    ws.send(JSON.stringify({ message: clients.size }));

    ws.on("message", async (data) => {
        clients.forEach(async (client) => {
            client.send(JSON.stringify(`${data}`));
        });
    });

    ws.on("close", () => {
        clients.delete(ws);
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



