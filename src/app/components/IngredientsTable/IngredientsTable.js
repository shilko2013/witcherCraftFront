import React, {Component} from 'react';
import './IngredientsTable.css';
import axios from "axios";
import {history} from '../../../index';
import connect from "react-redux/es/connect/connect";
import {switchShow} from "../../actions/InterfaceActions";

class IngredientsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            error: ''
        };
    }

    isEditor = () => {
        return this.props.role === "USER_STATUS_ADMIN"
            || this.props.role === "USER_STATUS_EDITOR";
    };

    getIngredients = () => {
        return axios.get("http://localhost:8080/witcher_war_exploded/component/components/false");
    };

    componentDidMount() {
        this.getIngredients()
            .then(response => this.setState({
                ...this.state,
                ingredients: response.data
            }))
            .catch((error) => {
                console.log(error);
                this.setState({
                    ...this.state,
                    error: 'Данные не могут быть загружены!'
                });
            });
    }

    render() {
        return (
            <div className="IngredientsTable">
                {this.isEditor &&
                <button onClick={() => {
                    history.push('/add/ingredient');
                }}>Добавить ингредиент</button>
                }
                <div className="errorDiv">
                    {this.state.error}
                </div>
                {this.state.ingredients &&
                <table className="dataTable">
                    <thead>
                    <tr>
                        <th>Изображение</th>
                        <th>Название ингридиента</th>
                        <th>Название категории</th>
                        <th>Цена</th>
                        <th>Вес</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.ingredients.map((elem, i) =>
                            <tr onClick={() => {
                                history.push('/ingredient/' + elem.id)
                            }}>
                                <td>
                                    <img
                                        src={"http://localhost:8080/witcher_war_exploded/component/" + elem.id + "/image"}/>
                                </td>
                                <td>
                                    {elem.name}
                                </td>
                                <td>
                                    {elem.categoryComponent.name}
                                </td>
                                <td>
                                    {elem.price}
                                </td>
                                <td>
                                    {elem.weight}
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        role: state.auth.role
    })
)(IngredientsTable);