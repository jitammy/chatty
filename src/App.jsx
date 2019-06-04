import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  componentDidMount(){
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
  
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      
      this.setState({messages: messages})
    }, 1000);
  };
  constructor(props) {
    super(props);
    this.state={
      currentUser: {name: "Bob"}, 
      messages: [
        { id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        },
        {
          type: "incomingNotification",
          content: "Anonymous2 changed their name to NotFunny",
      }
      
      ]

    }
  }
  render() {
    return (
      <div className="body">
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
       
        <MessageList messages = {this.state.messages}/>
        <ChatBar user={this.state.currentUser}/>
      </div>
    )
  }
};



export default App;
