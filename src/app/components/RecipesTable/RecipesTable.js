import React, {Component} from 'react';
import './RecipesTable.css';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";

class RecipesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: null,
            error: null
        }
    }

    isEditor = () => {
        return this.props.role === "USER_STATUS_ADMIN"
            || this.props.role === "USER_STATUS_EDITOR";
    };

    getThings = () => {
        return axios.get("http://localhost:8080/witcher_war_exploded/thing/things/true");
    };

    componentDidMount() {
        this.getThings()
            .then(response => {
                this.setState({
                    ...this.state,
                    things: response.data
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    ...this.state,
                    error: 'Данные не могут быть загружены!'
                });
            });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={this.state.redirect}/>
        }
        return (
            <div className="RecipesTable">
                <div className="errorDiv">
                    {this.state.error}
                </div>
                {this.state.things &&
                <table className="dataTable">
                    <thead>
                    <tr>
                        <th>Изображение</th>
                        <th>Название предмета</th>
                        <th>Рецепты</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.things.map((elem, i) =>
                            <tr>
                                <td>
                                    <img
                                        src={"http://localhost:8080/witcher_war_exploded/draft/" + elem.id + "/image"}/>
                                </td>
                                <td onClick={() => {
                                    this.setState({
                                        ...this.state,
                                        redirect: '/thing/' + elem.id
                                    })
                                }}>
                                    {elem.name}
                                </td>
                                <td>
                                    {elem.drafts.map((element, index) =>
                                    <div>
                                        <a onClick={() => {
                                            this.setState({
                                                ...this.state,
                                                redirect: '/draft/' + element.id
                                            })
                                        }}>{index} рецепт</a>
                                        <br/>
                                    </div>
                                )}
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

export default RecipesTable;