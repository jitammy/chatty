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

    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: "userNumber",
                userNumber: wss.clients.size
            }))
        }
    })

    ws.on('message', message => {
        const parsedMessage = JSON.parse(message)
        switch (parsedMessage.type) {
            case "postMessage":

                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(
                            {
                                type: "incomingMessage",
                                id: uuidv1(),
                                username: parsedMessage.username,
                                content: parsedMessage.content
                            }
                        ));
                    }
                })

                break;
                
            case "postNotification":

                wss.clients.forEach(function each(client) {
                    if (client.readyState == WebSocket.OPEN) {
                        client.send(JSON.stringify(
                            {
                                type: 'incomingNotication',
                                content: parsedMessage.content
                            }
                        ))
                    }
                })
                break;


        }

    });

    ws.on('close', () => console.log('Client disconnected'));
});
