import React, { Component } from 'react';
import Message from "./Message.jsx";
import Notification from "./Notification.jsx";


class MessageList extends Component {

    render() {
        console.log("Rending Messagelist")
        const messageComponents = this.props.messages.map( 
          function(message) {
            if(message.type === "incomingMessage") {
              return <Message key={message.id} content={message.content} username = {message.username} color = {message.color}/>
            } else {
              return <Notification key={message.id} content={message.content} />
            }

          } 
        )
            
        return (
            <main className="messages">
                {messageComponents}
            </main>
        )
    }
}



export default MessageList;