import React, {Component} from 'react';
import './Recipe.css';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

class Recipe extends Component {
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

    getDraft = () => {
        return axios.get("http://localhost:8080/witcher_war_exploded/draft/" + this.props.draftId);
    };

    componentDidMount() {
        this.getDraft()
            .then(response => {
                this.setState({
                    ...this.state,
                    draft: response.data
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
            <div className={this.props.asideMenuIsShow ? "Recipe" : "Recipe fullScreen"}>
                {this.state.error &&
                <div className="errorDiv">
                    {this.state.error}
                </div>
                }
                {this.state.draft &&
                <div className={!this.props.asideMenuIsShow ? "pageContent" : "pageContent pageContentNotFullScreen"}>
                    <h1>{this.state.draft.thing.name}</h1>
                    {this.isEditor() &&
                    <button onClick={() => this.setState({
                        ...this.state,
                        redirect: '/edit/recipe/' + this.state.draft.id
                    })}>Редактировать рецепт</button>
                    }
                    <img
                        src={"http://localhost:8080/witcher_war_exploded/thing/" + this.state.draft.id + "/image"}/>
                    <div className="draftsDiv">
                        <br/>
                        Используемые компоненты:
                        <br/>
                        {this.state.draft.components.map((elem, index) =>
                            <div>
                                <Link to={'/ingredient/' + elem.id}>
                                    {elem.name}
                                </Link>
                                <br/>
                            </div>
                        )}
                    </div>
                    <br/>
                    <div className="descriptionDiv">
                        {this.state.draft.information}
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
)(Recipe);