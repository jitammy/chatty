import React, { Component } from 'react';
import { get } from 'http';
class Message extends Component {

  constructor(props){
    super(props)
    this.state = {
      content: props.content,
      urlArray: []
    }
  }

  componentWillMount() {
   

    const separatedSpace = this.state.content.split(" ");

    const regex = new RegExp(/(https?:\/\/.*\.(?:png|jpg|gif))/i);


    var withUrl = this.state.content;

    for (let i = 0; i < separatedSpace.length; i++) {
      const url = separatedSpace[i].match(regex);

      if (url !== null) {
        this.state.urlArray.push(url[0])
        withUrl = withUrl.replace(url[0], "");
      }
    }
    this.setState({
      content: withUrl
    })
  }


  render() {

    const getImg = this.state.urlArray.map(function (url) {
      const randomNumber = Math.floor(Math.random() * 1000000000000)
     
        return <img key={randomNumber} src={url} alt="new"/>
      
    })
    // function getImg (){
    //   const randomNumber = Math.floor(Math.random() * 1000000000000)
    //   return <img key={randomNumber} src={this.state.content} alt="new"/>

    // }


    return (
      <div className="message">
        <span className="message-username" style={{ color: this.props.color }}>
          {this.props.username}
        </span>
        <span className="message-content">
          {this.state.content}
          {getImg}
          </span>
      </div>
    )
  }
}
export default Message;
