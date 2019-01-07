import React, {Component} from 'react';
import './MenuNode.css';
import defaultImg from "../../../resources/images/defaultImg.bmp";
import {Link} from 'react-router-dom';

class MenuNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: props.src,
            text: props.text,
            nodes: props.nodes,
            nodeHrefs: props.nodeHrefs,
            nodeImgs: props.nodeImgs,
            href: props.href,
            isExternal : props.isExternal
        }
    }

    render() {
        return (
            <div className="MenuNode">
                <div className={'textPartMenuNode ' + (this.state.nodes ? '' : 'textPart')}
                     onClick={() => this.setState({
                         ...this.state,
                         selected: !this.state.selected
                     })}>
                    {
                        this.state.href && this.state.isExternal &&
                        <a href={this.state.href}
                           target="_blank"
                           rel="nofollow noopener">
                            <img
                                src={this.state.src || defaultImg}
                                alt=""/>
                            <div className="nodeText unselectable">
                                {this.state.text}
                            </div>
                        </a>
                    }
                    {
                    this.state.href && !this.state.isExternal &&
                    <Link to={this.state.href}>
                        <img
                            src={this.state.src || defaultImg}
                            alt=""/>
                        <div className="nodeText unselectable">
                            {this.state.text}
                        </div>
                    </Link>
                }
                    {
                        !this.state.href &&
                        <div>
                            <img
                                src={this.state.src || defaultImg}
                                alt=""/>
                            < div className="nodeText unselectable">
                                {this.state.text}
                            </div>
                        </div>
                    }
                </div>
                <div className={'listPart'}>
                    {this.state.nodes &&
                    <div>
                        {
                            this.state.nodes.map((elem, index) => <MenuNode text={elem}
                                                                            href={this.state.nodeHrefs[index]}
                                                                            src={this.state.nodeImgs && (this.state.nodeImgs[index] || defaultImg)}/>)
                        }
                    </div>
                    }
                </div>
            </div>
        )
    }
}

export default MenuNode;