import React, { Component } from 'react';

class Notification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: "incomingNotification",
            content: "Anonymous2 changed their name to NotFunny",
        }
    }
    render() {
        return (
            <div className="message system">

                {this.state.content}
          </div>
        )
    }
}
export default Notification;