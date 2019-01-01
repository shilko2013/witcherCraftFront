import React, {Component} from 'react';
import './NodeList.css';

class NodeList extends Component {
  constructor(props){
    super(props);
    this.state = {
      nodes: props.nodes
    };
  }
  render(){
    return (
        <ul className="NodeList">
          {
            this.state.nodes.map((text,index) => {
              return <li key={index}>{text}</li>
            })
          }
        </ul>
    )
  }
}

export default NodeList;