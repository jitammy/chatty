import React, { Component } from 'react';
import Message from "./Message.jsx";

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    render() {
  
        return (
            <main className="messages">
                <Message/>
            </main>
        )
    }
}
export default MessageList;