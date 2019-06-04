import React, { Component } from 'react';
import Message from "./Message.jsx";
import Notification from "./Notification.jsx";


class MessageList extends Component {

    render() {
        console.log("Rending Messagelist")

        const messageComponents = this.props.messages.map((message) => <Message key={message.id} message={message} />)
            
        return (
            <main className="messages">
                {messageComponents}
            </main>
        )
    }
}



export default MessageList;