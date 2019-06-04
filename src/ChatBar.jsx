import React, { Component } from 'react';

class CharBar extends Component {

    
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
