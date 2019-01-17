import React, {Component} from 'react';
import './ThingAddPage.css';
import axios from "axios";
import {Redirect} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

class ThingAddPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            effect: ['']
        };
    }

    isEditor = () => {
        return this.props.role === "USER_STATUS_ADMIN"
            || this.props.role === "USER_STATUS_EDITOR";
    };

    uploadForm = () => {
        let params = new FormData();
        params.append('name', this.state.name);
        params.append('price', this.state.price);
        params.append('weight', this.state.weight);
        params.append('description', this.state.description);
        params.append('type', this.state.type);
        params.append('isAlchemy', this.props.isAlchemy);
        params.append('effects', this.state.effect);
        params.append('image', this.state.file);
        axios.post("http://localhost:8080/witcher_war_exploded/thing/api/add", params, {
            responseType: 'text',
            withCredentials: true,
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(response => {
            this.setState({
                ...this.state,
                error: 'Данные успешно добавлены!'
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
            return <Redirect push to={'/alchemyThings'}/>;
        return (
            <div className={this.props.asideMenuIsShow ? "ThingAddPage" : "ThingAddPage fullScreen"}>
                {this.state.error &&
                <div className="errorDiv">
                    {this.state.error}
                </div>
                }
                <form className={!this.props.asideMenuIsShow ? "pageContent" : "pageContent pageContentNotFullScreen"}
                      onSubmit={(event) => {
                          event.preventDefault();
                          this.uploadForm();
                      }
                      }>
                    <label>Название: </label>
                    <input required
                           value={this.state.name}
                           onChange={(event) => this.setState({
                               ...this.state,
                               name: event.target.value
                           })}/>
                    <div className="categoryDiv">
                        <label>Тип: </label>
                        <input required
                               value={this.state.type}
                               onChange={(event) => this.setState({
                                   ...this.state,
                                   type: event.target.value
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
                    <div className="effectsDiv">
                        Эффекты:
                        <button onClick={(event) => {
                            event.preventDefault();
                            let effects = this.state.effect;
                            effects.push('');
                            this.setState({
                                ...this.state,
                                effect: effects
                            })
                        }}>+</button>
                        <button onClick={(event) => {
                            event.preventDefault();
                            let effects = this.state.effect;
                            effects.pop();
                            this.setState({
                                ...this.state,
                                effect: effects
                            })
                        }}>-
                        </button>
                        <br/>
                        {this.state.effect.map((elem, index) =>
                            <textarea
                                key={index}
                                value={this.state.effect[index]}
                                onChange={(event) => {
                                    let effects = this.state.effect;
                                    effects[index] = event.target.value;
                                    this.setState({
                                        ...this.state,
                                        effect: effects
                                    })
                                }}
                            />
                        )}
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
                    <button type="submit">Добавить</button>
                </form>
            </div>
        )
    }
}

export default connect(
    state => ({
        role: state.auth.role,
        asideMenuIsShow: state.interface.asideMenuIsShow
    })
)(ThingAddPage);