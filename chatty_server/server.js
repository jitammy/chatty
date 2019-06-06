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

  var colors = ["red", "green", "blue", "yellow", "purple", "salmon", "#CCC"]
  function random_color(items) {
    return items[Math.floor(Math.random() * colors.length)]
  }

  wss.clients.forEach(function each(client) {
    let selectedColor = random_color(colors)
    console.log(selectedColor)
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: "userColor",
        usercolor: selectedColor
      }))
    }
  })


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
        const clientMessage = {
          type: "incomingMessage",
          id: uuidv1(),
          username: parsedMessage.username,
          color: parsedMessage.color,
          content: parsedMessage.content
        }
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(clientMessage));
          }
        })
        break;

      case "postNotification":
        wss.clients.forEach(function each(client) {
          if (client.readyState == WebSocket.OPEN) {
            client.send(JSON.stringify(
              {
                type: 'incomingNotification',
                content: parsedMessage.content,
              }
            ))
          }

        })
        break;
    }
  });

  ws.on('close', () => console.log('Client disconnected'));
});
