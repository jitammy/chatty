import React, { Component } from 'react';


class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "incomingMessage",
            content: "",
            username: ""
        }
    }
    render() {
        return (
            <div className="message">
                <span className="message-username">
                    {this.state.username}
                </span>
                <span className="message-content">

                    {this.state.content}
                </span>
            </div>
        )
    }
}
export default Message;
