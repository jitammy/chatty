import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import { join } from 'path';
class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.changeUser = this.changeUser.bind(this)
    this.state = {
      users: 0,
      currentUser: {name: ''},
      messages: []
    }
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001")
    this.socket.onopen = function (event) {
      console.log("Listening on 3001 Client connected")
    }
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = { id: 3, username: "Michelle", content: "Hello there!" };
      const messages = this.state.messages.concat(newMessage)
      this.setState({ messages: messages })
    }, 1000);

    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data)
      switch(data.type){
        case "incomingMessage": 
            const incomingNewMessage = {
              type: "incomingMessage",
              id: data.id,
              username: data.username,
              content: data.content
            }
            const allMessages = this.state.messages.concat(incomingNewMessage)
            this.setState({ messages: allMessages })
          break;
        case "incomingNotification":
          const receivedNotification = {
            type: "incomingNotification",
            id: data.id,
            content: data.content
          }
          const allNotifications = this.messages.concat(receivedNotification)
          this.setState({messages: allNotifications})

          break;
        default: 
          throw new Error("Unknown event type" + data.type)
      }
      

    }
  };
  render() {
    return (
      <div className="body">
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="onlineUsers">{this.state.users} users online</div>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} handleChange={this.handleChange.bind(this)} changeUser={this.changeUser.bind(this)} />
      </div>
    )
  }
  handleChange(e) {
    const oldName = (this.state.currentUser.name) ? this.state.currentUser.name : 'Anonymous'
    const newMessage = {
      type: 'postMessage',
      username: oldName,
      content: e.target.value
    };
    // if person clicked enter then setState
    if (e.key === "Enter") {
      console.log("this is the message in handleChange", newMessage)
      this.socket.send(JSON.stringify(newMessage))
      document.getElementById('contentInput').value = ''
    }
  }

  changeUser(e) {
    const newName = e.target.value;
    const oldName = (this.state.currentUser.name) ? this.state.currentUser.name : 'Anonymous'
    if (e.key === "Enter") {
      if (newName !== oldName) {
        this.socket.send(JSON.stringify({
          type: 'postNotification',
          content: `${oldName} changed their name to ${newName}`
        }))
        this.setState({currentUser: { name: newName } })

      }
    }
  }
};
export default App;
