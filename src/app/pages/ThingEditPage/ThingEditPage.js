import React, {Component} from 'react';
import './ThingEditPage.css';
import axios from "axios";
import connect from "react-redux/es/connect/connect";
import {Redirect} from "react-router-dom";

class ThingEditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    isEditor = () => {
        return this.props.role === "USER_STATUS_ADMIN"
            || this.props.role === "USER_STATUS_EDITOR";
    };

    getThing = () => {
        return axios.get("http://localhost:8080/witcher_war_exploded/thing/" + this.props.thingId);
    };

    componentDidMount() {
        this.getThing()
            .then(response => {
                this.setState({
                    ...this.state,
                    thing: response.data,
                    name: response.data.name,
                    type: response.data.typeThing.name,
                    price: response.data.price,
                    weight: response.data.weight,
                    description: response.data.descriptionThing.description,
                    effect: response.data.effects.map(elem => elem.name),
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
        params.append('type', this.state.type);
        params.append('effects', this.state.effect);
        params.append('image', this.state.file);
        axios.post("http://localhost:8080/witcher_war_exploded/thing/api/edit", params, {
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
            return <Redirect push to={'/alchemyThings'}/>;
        return (
            <div className={this.props.asideMenuIsShow ? "ThingEditPage" : "ThingEditPage fullScreen"}>
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
                    <h1>{this.state.name}</h1>
                    <img src={"http://localhost:8080/witcher_war_exploded/thing/"+this.props.thingId+"/image"}/>
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
                        {this.state.effect && this.state.effect.map((elem, index) =>
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
                    <button type="submit">Редактировать</button>
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
)(ThingEditPage);