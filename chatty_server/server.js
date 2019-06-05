const express = require('express');
const WebSocket = require('ws')
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1')
const PORT = 3001;
const server = express()
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));
const wss = new SocketServer({ server });
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', message => {
        const parsedMessage = JSON.parse(message)

        const clientMessage = {
            type: "incomingMessage",
            id: uuidv1(),
            username: parsedMessage.username,
            content: parsedMessage.content
        }
        const jsonToSend = JSON.stringify(clientMessage)
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(jsonToSend);
            }
            console.log(client.readyState, WebSocket.OPEN)
        })

        console.log(JSON.stringify(clientMessage))
    });
    ws.on('close', () => console.log('Client disconnected'));
});
