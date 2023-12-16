import { WebSocketServer } from 'ws';

const SOCKPORT = 3250;

const sockServer = new WebSocketServer({ port: SOCKPORT }, () => {
    console.log("WebSocket connection is on ", SOCKPORT)
});

sockServer.on("connection", ws => {
    console.log("A new Client has Connected");
    ws.on("close", () => console.log("Client has disconnected"));

    ws.on("message", data => {
        console.log("message recieved: ", data.toString());
        sockServer.clients.forEach(client => {
            client.send(data.toString());
        })
    });

    ws.onerror = function () {
        console.log("websocket error happened");
    }
});

