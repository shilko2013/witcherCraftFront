import React, {Component} from 'react';
import './LogoutNode.css';
import defaultImg from "../../../resources/images/defaultImg.bmp";
import connect from "react-redux/es/connect/connect";
import {logout} from "../../../actions/AuthActions";

class LogoutNode extends Component {
  constructor(props){
    super(props);
    this.state = {
      src: props.src,
      text: props.text
    }
  }
  render(){
    return (
        <div className="MenuNode">
          <img
              src={this.state.src || defaultImg}
              alt=""/>
          <div className="nodeText unselectable" onClick={this.props.logout}>
            {this.state.text}
          </div>
        </div>
    )
  }
}

export default connect(
    state => ({}),
    dispatch => ({
      logout: () => {
        dispatch(logout());
      }
    })
)(LogoutNode);