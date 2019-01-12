import React, {Component} from 'react';
import './IngredientPage.css';
import axios from "axios";
import {Link} from "react-router-dom";
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
    }

    render() {
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
                    <img src={"http://localhost:8080/witcher_war_exploded/component/" + this.state.ingredient.id + "/image"}/>
                    <div className="categoryDiv">
                        {this.state.ingredient.categoryComponent.name}
                        <br/>
                        {this.state.ingredient.categoryComponent.information}
                    </div>
                    <div className="infoDiv">
                        Цена: {this.state.ingredient.price}
                        <br/>
                        Вес: {this.state.ingredient.weight}
                    </div>
                    <div className="draftsDiv">
                        Рецепты из которых можно скрафтить:
                        <br/>
                        {this.state.ingredient.drafts.map((elem, index) =>
                            <Link to={'/draft/'+elem.id}>
                                {index+1} рецепт
                            </Link>
                        )}
                    </div>
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