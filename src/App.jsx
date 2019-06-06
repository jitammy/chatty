import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import { join } from 'path';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: 0,
      currentUser: { name: 'Anonymous' },
      messages: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.changeUser = this.changeUser.bind(this)
  }

  handleChange(e) {
    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: e.target.value
    };

    if (e.key === "Enter") {
      this.setState({messages: newMessage})
      this.socket.send(JSON.stringify(newMessage))
      document.getElementById('contentInput').value = ''
    }
  }

  changeUser(e) {
    console.log(e.target.value)
    const newName = e.target.value;
    const oldName = (this.state.currentUser.name) ? this.state.currentUser.name : 'Anonymous'

    if (e.key === "Enter") {
      
      if (newName !== oldName) {
        this.setState({ currentUser: { name: newName } })
        this.socket.send(JSON.stringify({
          type: 'postNotification',
          content: `${oldName} changed their name to ${newName}`
        }))
      }


    }
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001")

    this.socket.onopen = function () {
      console.log("Listening on 3001 Client connected")
    }

    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data)
      switch (data.type) {
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
          this.setState({ messages: allNotifications })
          break;

        case "userNumber":
          this.setState({ users: data.userNumber })
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
        <ChatBar currentUser={this.state.currentUser} handleChange={this.handleChange} changeUser={this.changeUser} />
      </div>
    )
  }
  
};
export default App;
