import React, {Component} from 'react';
import './RecipeAddPage.css';
import axios from "axios";
import {Redirect} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

class RecipeAddPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            component: ['']
        }
    }

    isEditor = () => {
        return this.props.role === "USER_STATUS_ADMIN"
            || this.props.role === "USER_STATUS_EDITOR";
    };

    uploadForm = () => {
        let params = new FormData();
        params.append('thing', this.state.name);
        params.append('components', this.state.component);
        params.append('information', this.state.information);
        axios.post("http://localhost:8080/witcher_war_exploded/draft/api/add", params, {
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
            return <Redirect push to={'/recipes'}/>;
        return (
            <div className={this.props.asideMenuIsShow ? "RecipeAddPage" : "RecipeAddPage fullScreen"}>
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
                    <label>Название предмета: </label>
                    <input required
                           value={this.state.name}
                           onChange={(event) => this.setState({
                               ...this.state,
                               name: event.target.value
                           })}/>
                    <div className="componentDiv">
                        Названия компонентов:
                        <button onClick={(event) => {
                            event.preventDefault();
                            let effects = this.state.component;
                            effects.push('');
                            this.setState({
                                ...this.state,
                                component: effects
                            })
                        }}>+</button>
                        <button onClick={(event) => {
                            event.preventDefault();
                            let effects = this.state.component;
                            effects.pop();
                            this.setState({
                                ...this.state,
                                component: effects
                            })
                        }}>-
                        </button>
                        <br/>
                        {this.state.component.map((elem, index) =>
                            <textarea
                                key={index}
                                value={this.state.component[index]}
                                onChange={(event) => {
                                    let effects = this.state.component;
                                    effects[index] = event.target.value;
                                    this.setState({
                                        ...this.state,
                                        component: effects
                                    })
                                }}
                            />
                        )}
                    </div>
                    <label>Информация: </label>
                    <input required
                           value={this.state.information}
                           onChange={(event) => this.setState({
                               ...this.state,
                               information: event.target.value
                           })}/>
                    <br/>
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
)(RecipeAddPage);