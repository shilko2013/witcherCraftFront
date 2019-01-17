import React, {Component} from 'react';
import './Ingredients.css';
import connect from "react-redux/es/connect/connect";
import IngredientsTable from "../../components/IngredientsTable/IngredientsTable";
import {Redirect} from "react-router-dom";

class Ingredients extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    isEditor = () => {
        return this.props.role === "USER_STATUS_ADMIN"
            || this.props.role === "USER_STATUS_EDITOR";
    };

    render() {
        if (this.state.redirect) {
            return <Redirect push to={this.state.redirect} />
        }
        return (
            <div className={this.props.asideMenuIsShow ? "Ingredients" : "Ingredients fullScreen"}
                 style={{height: this.props.height}}>
                <h1>{this.props.isAlchemy ? 'Ингридиенты' : 'Компоненты'}</h1>
                {this.isEditor() &&
                <button onClick={() => {
                    this.setState({
                        ...this.state,
                        redirect: this.props.isAlchemy ? '/add/ingredient': '/add/component'
                    });
                }}>Добавить {this.props.isAlchemy ? 'ингридиент' : 'компонент'}</button>
                }
                <IngredientsTable isAlchemy={this.props.isAlchemy}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        role: state.auth.role,
        asideMenuIsShow: state.interface.asideMenuIsShow
    })
)(Ingredients);