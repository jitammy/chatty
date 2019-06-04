import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      currentUser: { name: "Bob" },
      messages: [
        {
          id: 1,
          username: "Bob",
          content: ""
        }
      ]
    }
  }

  handleChange(e) {
    console.log(e.key)
    const newMessage = {
      username: this.state.currentUser.name,
      content: e.target.value
    };
    // if person clicked enter then setState
    if(e.key === "Enter"){
      const messages = this.state.messages.concat(newMessage)
      this.setState({ messages: messages })
      document.getElementById('contentInput').value = ''
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001")

    this.socket.onopen = function(event){
      console.log("Listening on 3001 Client connected")
    }
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = { id: 3, username: "Michelle", content: "Hello there!" };
      const messages = this.state.messages.concat(newMessage)
      this.setState({ messages: messages })
    }, 1000);
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
};


export default App;
