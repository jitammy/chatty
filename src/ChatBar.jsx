import React, { Component } from 'react';
class CharBar extends Component {


    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} onKeyUp={this.props.changeUser} id="userInput" />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.props.handleChange} id="contentInput"/>
            </footer>
        )
    }


}
export default CharBar;
