import React, {Component} from 'react';
import './IngredientPage.css';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

class IngredientPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredient: null,
            error: null
        }
    }

    isEditor = () => {
        return this.props.role === "USER_STATUS_ADMIN"
            || this.props.role === "USER_STATUS_EDITOR";
    };

    getIngredient = () => {
        return axios.get("http://localhost:8080/witcher_war_exploded/component/" + this.props.ingredientId);
    };

    componentDidMount() {
        this.getIngredient()
            .then(response => {
                this.setState({
                    ...this.state,
                    ingredient: response.data
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    ...this.state,
                    error: 'Данные не могут быть загружены!'
                });
            });
    };

    deleteIngredient = () => {
        return axios.post("http://localhost:8080/witcher_war_exploded/component/api/delete/" + this.props.ingredientId);
    };

    deleteIngredientSubmit = () => {
        this.deleteIngredient()
            .then(response => {
                this.setState({
                    ...this.state,
                    error: 'Ингредиент успешно удален'
                });
            })
            .catch(error => {

                this.setState({
                    ...this.state,
                    error: 'Сервер временно недоступен'
                });
            })
    };

    render() {
        if (this.state.redirect) {
            return <Redirect push to={this.state.redirect}/>
        }
        return (
            <div className={this.props.asideMenuIsShow ? "IngredientPage" : "IngredientPage fullScreen"}>
                {this.state.error &&
                <div className="errorDiv">
                    {this.state.error}
                </div>
                }
                {this.state.ingredient &&
                <div className={!this.props.asideMenuIsShow ? "pageContent" : "pageContent pageContentNotFullScreen"}>
                    <h1>{this.state.ingredient.name}</h1>
                    {this.isEditor() &&
                    <button onClick={() => this.setState({
                        ...this.state,
                        redirect: '/edit/ingredient/' + this.state.ingredient.id
                    })}>Редактировать ингридиент</button>
                    }
                    {this.isEditor() &&
                    <button onClick={() => this.deleteIngredientSubmit()}>Удалить ингредиент</button>
                    }
                    <img
                        src={"http://localhost:8080/witcher_war_exploded/component/" + this.state.ingredient.id + "/image"}/>
                    <div className="categoryDiv">
                        {this.state.ingredient.categoryComponent.name}
                    </div>
                    <div className="infoDiv">
                        <br/>
                        Цена: {this.state.ingredient.price}
                        <br/>
                        Вес: {this.state.ingredient.weight}
                        <br/>
                    </div>
                    {this.state.ingredient.drafts && this.state.ingredient.drafts.length !== 0 &&
                    <div className="draftsDiv">
                        <br/>
                        Рецепты в которых используется:
                        <br/>
                        {this.state.ingredient.drafts.map((elem, index) =>
                            <Link to={'/draft/' + elem.id}>
                                {elem.thing.name}
                            </Link>
                        )}
                    </div>
                    }
                    <br/>
                    <div className="descriptionDiv">
                        {this.state.ingredient.descriptionComponent.description}
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        role: state.auth.role,
        asideMenuIsShow: state.interface.asideMenuIsShow
    })
)(IngredientPage);