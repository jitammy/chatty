import React, { Component } from 'react';

class CharBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text:""
        }
    }
    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.user.name}/>
                <input className="chatbar-message" placeholder="Type a message and hit ENTER"  />
            </footer>
        )
    }
}
export default CharBar;
