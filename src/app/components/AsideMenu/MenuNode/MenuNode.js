import React, {Component} from 'react';
import './MenuNode.css';
import NodeList from "./NodeList/NodeList";
import defaultImg from "../../../resources/images/defaultImg.bmp";

class MenuNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: props.src,
            text: props.text,
            nodes: props.nodes
        }
    }

    render() {
        return (
            <div className="MenuNode">
                <div className="textPart">
                    <img
                        src={this.state.src || defaultImg}
                        alt=""/>
                    <div className="nodeText unselectable">
                        {this.state.text}
                    </div>
                </div>
                {this.state.nodes &&
                <NodeList nodes={this.state.nodes}/>
                }
            </div>
        )
    }
}

export default MenuNode;