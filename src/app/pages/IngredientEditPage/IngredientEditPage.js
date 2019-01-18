import React, {Component} from 'react';
import './IngredientEditPage.css';
import connect from "react-redux/es/connect/connect";
import {Link, Redirect} from "react-router-dom";
import {axiosInstance} from "../../../index";

class IngredientEditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }

    isEditor = () => {
        return this.props.role === "USER_STATUS_ADMIN"
            || this.props.role === "USER_STATUS_EDITOR";
    };

    getIngredient = () => {
        return axiosInstance.get("/component/" + this.props.ingredientId);
    };

    componentDidMount() {
        this.getIngredient()
            .then(response => {
                this.setState({
                    ...this.state,
                    ingredient: response.data,
                    name: response.data.name,
                    category: response.data.categoryComponent.name,
                    price: response.data.price,
                    weight: response.data.weight,
                    description: response.data.descriptionComponent.description,
                    error: ''
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

    uploadForm = () => {
        let params = new FormData();
        params.append('name', this.state.name);
        params.append('price', this.state.price);
        params.append('weight', this.state.weight);
        params.append('description', this.state.description);
        params.append('category', this.state.category);
        params.append('image', this.state.file);
        axiosInstance.post("/component/api/edit", params, {
            responseType: 'text',
            withCredentials: true,
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(response => {
            this.setState({
                ...this.state,
                error: 'Данные успешно отредактированы!'
            });
        }).catch((error) => {
            console.log(error);
            if (error.response && error.response.status === 400) {
                this.setState({
                    ...this.state,
                    error: error.response.data
                });
                return;
            }
            this.setState({
                ...this.state,
                error: 'Данные не могут быть загружены!'
            });
        });
    };

    render() {
        if (!this.isEditor())
            return <Redirect push to={'/ingredient/' + this.props.ingredientId}/>;
        return (
            <div className={this.props.asideMenuIsShow ? "IngredientEditPage" : "IngredientEditPage fullScreen"}>
                {this.state.error &&
                <div className="errorDiv">
                    {this.state.error}
                </div>
                }
                {this.state.ingredient &&
                <form className={!this.props.asideMenuIsShow ? "pageContent" : "pageContent pageContentNotFullScreen"}
                      onSubmit={(event) => {
                          event.preventDefault();
                          this.uploadForm();
                      }
                      }>
                    <img
                        src={"http://localhost:15880/witcher_war_exploded/component/" + this.state.ingredient.id + "/image"}/>
                    <h1>{this.state.name}</h1>
                    <div className="categoryDiv">
                        <label>Категория: </label>
                        <input required
                               value={this.state.category}
                               onChange={(event) => this.setState({
                                   ...this.state,
                                   category: event.target.value
                               })}/>
                    </div>
                    <div className="infoDiv">
                        <label>Цена: </label>
                        <input required
                               value={this.state.price}
                               onChange={(event) => this.setState({
                                   ...this.state,
                                   price: event.target.value
                               })}/>
                        <br/>
                        <label>Вес: </label>
                        <input required
                               value={this.state.weight}
                               onChange={(event) => this.setState({
                                   ...this.state,
                                   weight: event.target.value
                               })}/>
                    </div>
                    <br/>
                    <div className="descriptionDiv">
                        <label>Описание: </label>
                        <br/>
                        <textarea
                            value={this.state.description}
                            onChange={(event) => this.setState({
                                ...this.state,
                                description: event.target.value
                            })}/>
                    </div>
                    <div className="newPhotoDiv">
                        <label>Фото(необязательно): </label>
                        <br/>
                        <input
                            type="file"
                            size="10240"
                            accept="image/jpeg,image/png,image/gif"
                            onChange={(event) => this.setState({
                                ...this.state,
                                file: event.target.files[0]
                            })}/>
                    </div>
                    <button type="submit">Редактировать</button>
                </form>
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
)(IngredientEditPage);