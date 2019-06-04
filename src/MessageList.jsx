import React, { Component } from 'react';
import Message from "./Message.jsx";
import Notification from "./Notification.jsx";


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        console.log("Rending Messagelist")
        function getMessage(props){

            const Messages = props.map((message)=><Message key={message.id} username={message.username} content={message.content}/>)
            return Messages;
        }

        return (
            <main className="messages">

                {getMessage(this.props.messages)}
             
            </main>
        )
    }
}
export default MessageList;