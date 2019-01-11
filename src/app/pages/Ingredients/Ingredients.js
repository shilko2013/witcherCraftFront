import React, {Component} from 'react';
import './Ingredients.css';
import connect from "react-redux/es/connect/connect";
import IngredientsTable from "../../components/IngredientsTable/IngredientsTable";
import {history} from "../../../index";

class Ingredients extends Component {
    constructor(props) {
        super(props);
    }

    isEditor = () => {
        return this.props.role === "USER_STATUS_ADMIN"
            || this.props.role === "USER_STATUS_EDITOR";
    };

    render() {
        return (
            <div className={this.props.asideMenuIsShow ? "Ingredients" : "Ingredients fullScreen"}
                 style={{height: this.props.height}}>
                <h1>Ингридиенты</h1>
                {this.isEditor &&
                <button onClick={() => {
                    history.push('/add/ingredient');
                }}>Добавить ингредиент</button>
                }
                <IngredientsTable/>
            </div>
        )
    }
}

export default connect(
    state => ({
        asideMenuIsShow: state.interface.asideMenuIsShow
    })
)(Ingredients);