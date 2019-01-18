import React, {Component} from 'react';
import './CraftNode.css';
import craftImg from '../../../resources/images/draft.jpeg';
import {Link} from "react-router-dom";

class CraftNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classification: this.getClassification(),
            id: this.props.entity.id.substring(0, this.props.entity.id.length - 1)
        }
    }

    getClassification = () => {
        switch (this.props.entity.id.substr(-1)) {
            case '1':
                return 'base';
            case 'T':
                return 'thing';
            case 'C':
                return 'component';
            case 'D':
                return 'draft';
        }
    };

    render() {
        if (this.state.classification === 'base')
            return <svg height="50" width="50">
                <circle cx="30" cy="30" r="8" stroke="black" strokeWidth="3" fill="purple"/>
            </svg>;
        let picture;
        if (this.state.classification === 'draft')
            picture = <img src={craftImg}/>;
        else {
            picture = <img
                src={'http://localhost:15880/witcher_war_exploded/' + this.state.classification + '/' + this.state.id + '/image'}/>;
        }

        return (

            <div className="CraftNode">
                {picture}
                <div className={'infoNode'}>
                    {this.state.classification === 'draft' &&
                    <div className={'bubbleMenu'}>
                        {picture}
                        {this.props.entity.name}
                        <br/>
                        <Link to={'/draft/' + this.state.id}>
                            Подробнее...
                        </Link>
                    </div>
                    }
                    {this.state.classification === 'thing' &&
                    <div className={'bubbleMenu'}>
                        {picture}
                        {this.props.entity.name}
                        <br/>
                        Тип: {this.props.entity.typeThing}
                        <br/>
                        Цена: {this.props.entity.price}
                        <br/>
                        <Link to={'/thing/' + this.state.id}>
                            Подробнее...
                        </Link>
                    </div>
                    }
                    {this.state.classification === 'component' &&
                    <div className={'bubbleMenu'}>
                        {picture}
                        {this.props.entity.name}
                        <br/>
                        Тип: {this.props.entity.category}
                        <br/>
                        Цена: {this.props.entity.price}
                        <br/>
                        <Link to={'/ingredient/' + this.state.id}>
                            Подробнее...
                        </Link>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

export default CraftNode;