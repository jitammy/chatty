import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import { join } from 'path';
class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      currentUser: { name: "Bob" },
      messages: []
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001")
    this.socket.onopen = function (event) {
      console.log("Listening on 3001 Client connected")
      // console.log(event)
    }

    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = { id: 3, username: "Michelle", content: "Hello there!" };
      const messages = this.state.messages.concat(newMessage)
      this.setState({ messages: messages })
    }, 1000);

    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data)

     
      const incomingNewMessage = {
        type: "incomingMessage",
        id: data.id,
        username: data.username,
        content: data.content
      }

      const allMessages = this.state.messages.concat(incomingNewMessage)
      this.setState({ messages: allMessages })
      console.log(this.state)
    }
  };

  render() {
    return (
      <div className="body">
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar user={this.state.currentUser} handleChange={this.handleChange.bind(this)} />
      </div>
    )
  }


  handleChange(e) {
    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: e.target.value
    };
    // if person clicked enter then setState
    if (e.key === "Enter") {
      // const messages = this.state.messages.concat(newMessage)
      // this.setState({ messages: messages })
      console.log("this is the message in handleChange", newMessage)
      this.socket.send(JSON.stringify(newMessage))
      document.getElementById('contentInput').value = ''
    }
  }
};
export default App;
